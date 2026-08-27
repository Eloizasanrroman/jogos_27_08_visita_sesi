const botaoMemoria = document.querySelector(".jogar-memoria");
const botaoPalavras = document.querySelector(".jogar-palavras");


botaoMemoria.addEventListener("click", function () {
    this.classList.add("clicado");

    setTimeout(function () {
        window.location.href = "memoria.html";
    }, 300);
});


botaoPalavras.addEventListener("click", function () {
    this.classList.add("clicado");

    setTimeout(function () {
        window.location.href = "palavras.html";
    }, 300);
});



const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {
    card.addEventListener("mousemove", function (evento) {
        const largura = card.offsetWidth;
        const altura = card.offsetHeight;

        const x = evento.offsetX;
        const y = evento.offsetY;

        const rotacaoY = ((x / largura) - 0.5) * 4;
        const rotacaoX = ((y / altura) - 0.5) * -4;

        card.style.transform =
            `translateY(-10px) rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg)`;
    });


    card.addEventListener("mouseleave", function () {
        card.style.transform = "";
    });

});


document.addEventListener("DOMContentLoaded", function () {
    const elementos = document.querySelectorAll(
        ".icone-cerebro, .cabecalho h1, .cabecalho p, .divisor, .cabecalho h2, .card, .frase-final"
    );

    elementos.forEach(function (elemento, index) {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(20px)";

        setTimeout(function () {
            elemento.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            elemento.style.opacity = "1";
            elemento.style.transform = "translateY(0)";

        }, index * 120);
    });
});