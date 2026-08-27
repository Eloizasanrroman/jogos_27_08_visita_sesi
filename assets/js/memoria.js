const tabuleiro = document.getElementById("tabuleiro");
const tempoElemento = document.getElementById("tempo");
const paresElemento = document.getElementById("pares");
const botaoDica = document.getElementById("botaoDica");
const dicasRestantesElemento = document.getElementById("dicasRestantes");
const modal = document.getElementById("modal");
const tituloResultado = document.getElementById("tituloResultado");
const mensagemResultado = document.getElementById("mensagemResultado");
const tempoFinal = document.getElementById("tempoFinal");
const resultadoIcone = document.getElementById("resultadoIcone");
const botaoJogarNovamente = document.getElementById("jogarNovamente");


const TEMPO_INICIAL = 60;

const icones = [
    '<i class="fa-solid fa-bag-shopping" style="color: #d18ab5;"></i>',
    '<i class="fa-solid fa-headphones" style="color: #ff4174;"></i>',
    '<i class="fa-solid fa-clock" style="color: #80c3ea;"></i>',
    '<i class="fa-solid fa-ice-cream" style="color: #f8a0c9;"></i>',
    '<i class="fa-solid fa-seedling" style="color: #86c197;"></i>',
    '<i class="fa-solid fa-paw" style="color: #cd8668;"></i>',
    '<i class="fa-solid fa-camera-retro" style="color: #6b5daa;"></i>',
    '<i class="fa-solid fa-ribbon" style="color: #fa8aa2;"></i>'
];


let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;
let tempoRestante = TEMPO_INICIAL;
let cronometro = null;
let jogoAtivo = true;
let dicasRestantes = 3;


function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const numeroAleatorio = Math.floor(Math.random() * (i + 1));
        const temporario = lista[i];

        lista[i] = lista[numeroAleatorio];
        lista[numeroAleatorio] = temporario;
    }
    return lista;
}


function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    const minutosFormatados = String(minutos).padStart(2, "0");
    const segundosFormatados = String(segundosRestantes).padStart(2, "0");

    return `${minutosFormatados}:${segundosFormatados}`;
}


function atualizarCronometro() {
    tempoElemento.textContent = formatarTempo(tempoRestante);
}


function iniciarCronometro() {
    clearInterval(cronometro);

    cronometro = setInterval(function () {
        if (!jogoAtivo) {
            return;
        }

        tempoRestante--;
        atualizarCronometro();

        if (tempoRestante <= 0) {
            tempoRestante = 0;
            atualizarCronometro();
            perderJogo();
        }
    }, 1000);
}


function criarTabuleiro() {
    tabuleiro.innerHTML = "";
    const cartas = [...icones, ...icones];
    embaralhar(cartas);

    cartas.forEach(function (icone) {
        const carta = document.createElement("button");
        carta.classList.add("carta");
        carta.dataset.icone = icone;

        carta.innerHTML = `
            <div class="carta-interna">
                <div class="carta-frente">
                    <i class="fa-solid fa-brain"></i>
                </div>

                <div class="carta-verso">
                    ${icone}
                </div>
            </div>
        `;

        carta.addEventListener(
            "click",
            virarCarta
        );

        tabuleiro.appendChild(carta);
    });
}


function virarCarta(evento) {
    if (!jogoAtivo) {
        return;
    }

    if (bloqueado) {
        return;
    }

    const carta = evento.currentTarget;

    if (carta.classList.contains("virada")) {
        return;
    }

    if (carta.classList.contains("encontrada")) {
        return;
    }

    carta.classList.add("virada");

    if (primeiraCarta === null) {
        primeiraCarta = carta;
        return;
    }

    segundaCarta = carta;
    bloqueado = true;
    verificarPar();
}


function verificarPar() {
    const iconePrimeira = primeiraCarta.dataset.icone;
    const iconeSegunda = segundaCarta.dataset.icone;

    if (iconePrimeira === iconeSegunda) {
        cartasIguais();
    } else {
        cartasDiferentes();
    }
}


function cartasIguais() {
    primeiraCarta.classList.remove("virada");
    segundaCarta.classList.remove("virada");

    primeiraCarta.classList.add("encontrada");
    segundaCarta.classList.add("encontrada");

    paresEncontrados++;

    paresElemento.textContent = `${paresEncontrados}/8`;
    resetarEscolha();

    if (paresEncontrados === 8) {
        setTimeout(function () {
            ganharJogo();
        }, 500);
    }
}


function cartasDiferentes() {
    setTimeout(function () {
        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.remove("virada");

        resetarEscolha();
    }, 850);
}


function resetarEscolha() {
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}


function usarDica() {
    if (!jogoAtivo) {
        return;
    }

    if (bloqueado) {
        return;
    }

    if (dicasRestantes <= 0) {
        return;
    }

    const cartasNaoEncontradas =
        Array.from(
            document.querySelectorAll(
                ".carta:not(.encontrada)"
            )
        );

    if (cartasNaoEncontradas.length === 0) {
        return;
    }

    bloqueado = true;
    dicasRestantes--;

    dicasRestantesElemento.textContent = dicasRestantes;

    if (dicasRestantes === 0) {
        botaoDica.disabled = true;
    }

    cartasNaoEncontradas.forEach(function (carta) {
        carta.classList.add("virada");
    });

    setTimeout(function () {
        cartasNaoEncontradas.forEach(function (carta) {
            carta.classList.remove("virada");
        });

        bloqueado = false;
    }, 700);

}


function ganharJogo() {
    jogoAtivo = false;
    clearInterval(cronometro);

    resultadoIcone.classList.remove("derrota");
    resultadoIcone.innerHTML = `<i class="fa-solid fa-trophy"></i>`;
    tituloResultado.textContent = "Você ganhou!";
    mensagemResultado.textContent = "Parabéns! Você encontrou todos os pares!";
    tempoFinal.textContent = formatarTempo(TEMPO_INICIAL - tempoRestante);
    modal.classList.add("ativo");
}


function perderJogo() {
    if (!jogoAtivo) {
        return;
    }

    jogoAtivo = false;
    bloqueado = true;
    clearInterval(cronometro);

    resultadoIcone.classList.add("derrota");
    resultadoIcone.innerHTML = `<i class="fa-solid fa-hourglass-end"></i>`;
    tituloResultado.textContent = "Tempo esgotado!";
    mensagemResultado.textContent = "Não foi dessa vez, mas você pode tentar novamente!";
    tempoFinal.textContent = formatarTempo(TEMPO_INICIAL);
    modal.classList.add("ativo");
}


function reiniciarJogo() {
    clearInterval(cronometro);

    primeiraCarta = null;
    segundaCarta = null;

    bloqueado = false;
    paresEncontrados = 0;
    tempoRestante = TEMPO_INICIAL;
    jogoAtivo = true;
    dicasRestantes = 3;

    paresElemento.textContent = "0/8";
    dicasRestantesElemento.textContent = "3";
    botaoDica.disabled = false;

    atualizarCronometro();
    criarTabuleiro();
    modal.classList.remove("ativo");
    iniciarCronometro();
}


botaoDica.addEventListener(
    "click",
    usarDica
);


botaoJogarNovamente.addEventListener(
    "click",
    reiniciarJogo
);


criarTabuleiro();
atualizarCronometro();
iniciarCronometro();