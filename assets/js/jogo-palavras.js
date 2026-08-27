const palavras = {
    facil: [
        {
            palavra: "ABAJUR",
            dica: "Objeto usado para iluminar um ambiente."
        },
        {
            palavra: "BUSSOLA",
            dica: "Instrumento usado para descobrir direções."
        },
        {
            palavra: "AMPULHETA",
            dica: "Objeto que mede a passagem do tempo usando areia."
        },
        {
            palavra: "DESPENSA",
            dica: "Local destinado ao armazenamento de alimentos e outros mantimentos."
        },
        {
            palavra: "PLANETA",
            dica: "Corpo celeste grande que gira em torno de uma estrela."
        },
        { 
            palavra: "LABIRINTO", 
            dica: "Lugar cheio de caminhos que podem confundir." 
        },
        {
            palavra: "BENGALA",
            dica: "Objeto utilizado como apoio por algumas pessoas ao caminhar."
        },
        {
            palavra: "CORTINA",
            dica: "Pode controlar a entrada de luz e a visibilidade de uma janela."
        } 
    ],

    medio: [
        {
            palavra: "BIBLIOTECA",
            dica: "Lugar onde o conhecimento pode ser encontrado e organizado em diferentes formatos."
        },
        {
            palavra: "SEMAFORO",
            dica: "Pode determinar quando diferentes participantes de uma via devem esperar ou seguir."
        },
        {
            palavra: "ENCRUZILHADA",
            dica: "Lugar onde dois ou mais caminhos se encontram."
        },
        {
            palavra: "ELEVADOR",
            dica: "Permite mudar de altura dentro de uma construção sem utilizar uma sequência de degraus."
        },
        {
            palavra: "CORREDOR",
            dica: "Espaço que normalmente não é o destino final, mas permite chegar a outros lugares."
        },
        {
            palavra: "FRONTEIRA",
            dica: "Pode separar territórios sem necessariamente existir como uma barreira física."
        },
        {
            palavra: "ENTULHO",
            dica: "Conjunto de materiais ou restos deixados após uma construção ou reforma."
        },
        {
            palavra: "EMBALAGEM",
            dica: "Pode proteger um produto e também facilitar seu armazenamento ou transporte."
        }
    ],

    dificil: [
        {
            palavra: "CAMPEONATO",
            dica: "Reúne participantes que competem seguindo determinadas regras em busca de um resultado."
        },
        {
            palavra: "TERMÔMETRO",
            dica: "Dispositivo que mede a energia térmica de um sistema usando escalas numéricas."
        },
        {
            palavra: "DOCUMENTO",
            dica: "Pode servir para registrar, comprovar ou identificar alguma informação importante."
        },
        {
            palavra: "CONTRATO",
            dica: "Acordo jurídico formal entre partes com obrigações e direitos definidos."
        },
        {
            palavra: "REUNIÃO",
            dica: "Convergência de pessoas agendada para tomada de decisão."
        },
        {
            palavra: "ORÇAMENTO",
            dica: "Estimativa financeira que limita os gastos e planeja as receitas de um período."
        },
        {
            palavra: "INVESTIMENTO",
            dica: "Aplicação de recursos financeiros ou tempo visando obter um retorno futuro."
        },
        {
            palavra: "IMPOSTO",
            dica: "Tributo financeiro obrigatório cobrado pelo Estado para financiar gastos públicos."
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