const nicknameInput = document.getElementById("nickname")
const continuar = document.getElementById("continuar")
const niveis = document.querySelectorAll(".nivel")
const mensagem = document.getElementById("mensagem")

let nivelSelecionado = "facil"

niveis.forEach(function (nivel) {
    nivel.addEventListener("click", function () {
        niveis.forEach(function (outroNivel) {
            outroNivel.classList.remove("selecionado")
        })

        nivel.classList.add("selecionado")

        nivelSelecionado = nivel.dataset.nivel
    })
})


function iniciarJogo() {
    const nickname = nicknameInput.value.trim()

    if (nickname === "") {
        mensagem.innerText = "Digite um apelido para continuar!"
        nicknameInput.focus()
        return
    }

    sessionStorage.setItem("nickname", nickname)
    sessionStorage.setItem("nivel", nivelSelecionado)

    continuar.classList.add("clicado")

    setTimeout(function () {
        window.location.href = "jogo-palavras.html"
    }, 250)
}


continuar.addEventListener("click", function () {
    iniciarJogo()
})


nicknameInput.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        iniciarJogo()
    }
})