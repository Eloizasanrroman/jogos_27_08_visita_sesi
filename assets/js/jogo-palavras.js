const palavras = {
    facil: [
        {
            palavra: "GATO",
            dica: "É um animal doméstico que gosta de dormir."
        },
        {
            palavra: "BOLA",
            dica: "É usada em vários esportes."
        },
        {
            palavra: "CASA",
            dica: "É o lugar onde muitas pessoas moram."
        },
        {
            palavra: "FLOR",
            dica: "Pode ser encontrada em jardins."
        },
        {
            palavra: "LUA",
            dica: "Pode ser vista no céu durante a noite."
        }
    ],

    medio: [
        {
            palavra: "JARDIM",
            dica: "Lugar onde podemos encontrar muitas flores."
        },
        {
            palavra: "ESCOLA",
            dica: "Lugar onde estudamos e aprendemos."
        },
        {
            palavra: "VIAGEM",
            dica: "Quando vamos conhecer outro lugar."
        },
        {
            palavra: "PLANETA",
            dica: "A Terra é um deles."
        },
        {
            palavra: "TESOURO",
            dica: "Algo valioso que pode estar escondido."
        }
    ],

    dificil: [
        {
            palavra: "LABIRINTO",
            dica: "Lugar cheio de caminhos que podem confundir."
        },
        {
            palavra: "AVENTURA",
            dica: "Uma experiência emocionante e cheia de desafios."
        },
        {
            palavra: "CURIOSIDADE",
            dica: "Vontade de descobrir ou aprender alguma coisa."
        },
        {
            palavra: "IMAGINACAO",
            dica: "Capacidade de criar ideias e imagens na mente."
        },
        {
            palavra: "DESCOBERTA",
            dica: "Quando encontramos ou aprendemos algo novo."
        }
    ]
}


const nicknameDisplay = document.getElementById("nickname-display")
const nivelDisplay = document.getElementById("nivel-display")

const dica = document.getElementById("dica")
const palavraDisplay = document.getElementById("palavra")

const letraInput = document.getElementById("letra-input")
const tentar = document.getElementById("tentar")

const errosDisplay = document.getElementById("erros")
const letrasUsadasDisplay = document.getElementById("letras-usadas")

const mensagem = document.getElementById("mensagem")

const botoesFinais = document.getElementById("botoes-finais")
const jogarNovamente = document.getElementById("jogar-novamente")
const voltar = document.getElementById("voltar")



const nickname = sessionStorage.getItem("nickname")
const nivel = sessionStorage.getItem("nivel") || "facil"



let palavraEscolhida = ""
let dicaEscolhida = ""

let letrasDescobertas = []
let letrasUsadas = []

let erros = 0

const limiteErros = 5



nicknameDisplay.innerText = nickname || "Jogador"

nivelDisplay.innerText =
    nivel.charAt(0).toUpperCase() + nivel.slice(1)



function escolherPalavra() {
    const lista = palavras[nivel]

    const numeroAleatorio = Math.floor(Math.random() * lista.length)
    const palavraSorteada = lista[numeroAleatorio]

    palavraEscolhida = palavraSorteada.palavra
    dicaEscolhida = palavraSorteada.dica
}


function mostrarPalavra() {
    palavraDisplay.innerHTML = ""

    for (let i = 0; i < palavraEscolhida.length; i++) {
        const span = document.createElement("span")
        span.classList.add("letra-slot")
        span.id = `letra-${i}`
        span.innerText = "_"
        palavraDisplay.appendChild(span)
    }
}


function iniciarJogo() {
    escolherPalavra()

    letrasDescobertas = []
    letrasUsadas = []

    erros = 0

    dica.innerText = dicaEscolhida
    errosDisplay.innerText = erros
    letrasUsadasDisplay.innerText = "Letras usadas: nenhuma"
    mensagem.innerText = ""
    document.body.classList.remove("jogo-finalizado")
    botoesFinais.style.display = "none"
    tentar.style.display = "flex"
    letraInput.style.display = "block"

    mostrarPalavra()

    letraInput.value = ""
    letraInput.focus()
}


function tentarLetra() {
    if (letraInput.disabled) {
        return
    }

    const letra = letraInput.value.trim().toUpperCase()
    
    if (letra === "") {
        mensagem.innerText = "Digite uma letra!"
        letraInput.focus()

        return
    }

    if (!/^[A-ZÀ-Ú]$/.test(letra)) {
        mensagem.innerText = "Digite apenas uma letra!"
        letraInput.value = ""
        letraInput.focus()

        return
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.innerText = "Você já tentou essa letra!"
        letraInput.value = ""
        letraInput.focus()

        return
    }

    letrasUsadas.push(letra)

    letrasUsadasDisplay.innerText = `Letras usadas: ${letrasUsadas.join(", ")}`


    if (palavraEscolhida.includes(letra)) {
        mensagem.innerText = "Boa! Você acertou! ✨"
        mensagem.style.color = "#8065b5"

        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra) {
                document.getElementById(`letra-${i}`).innerText = letra

                if (!letrasDescobertas.includes(i)) {
                    letrasDescobertas.push(i)
                }
            }
        }

        if (letrasDescobertas.length === palavraEscolhida.length) {
            venceu()
        }
    } else {

        erros++
        errosDisplay.innerText = erros
        mensagem.innerText = "Essa letra não está na palavra!"
        mensagem.style.color = "#d16b8d"

        if (erros >= limiteErros) {
            perdeu()
        }
    }

    letraInput.value = ""
    letraInput.focus()
}


function venceu() {
    document.body.classList.add("jogo-finalizado")
    mensagem.innerText = `Parabéns, ${nickname || "jogador"}! Você descobriu a palavra! 🎉`
    mensagem.style.color = "#7960b5"
    botoesFinais.style.display = "flex"
    tentar.style.display = "none"
    letraInput.style.display = "none"

    for (let i = 0; i < palavraEscolhida.length; i++) {
        document.getElementById(`letra-${i}`).innerText = palavraEscolhida[i]
    }
}


function perdeu() {
    document.body.classList.add("jogo-finalizado")
    mensagem.innerText = `Que pena! A palavra era: ${palavraEscolhida}`
    mensagem.style.color = "#d16b8d"
    botoesFinais.style.display = "flex"
    tentar.style.display = "none"
    letraInput.style.display = "none"

    for (let i = 0; i < palavraEscolhida.length; i++) {
        document.getElementById(`letra-${i}`).innerText = palavraEscolhida[i]
    }
}


tentar.addEventListener("click", function () {
    tentarLetra()
})


letraInput.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        tentarLetra()
    }
})


jogarNovamente.addEventListener("click", function () {
    iniciarJogo()
})


voltar.addEventListener("click", function () {
    window.location.href = "palavras.html"
})


iniciarJogo()