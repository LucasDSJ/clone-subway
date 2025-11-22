const elementos = document.querySelectorAll(".scroll-anim");

// impede de recarregar animações caso a página não esteja no topo
if (window.scrollY > 50) {
    elementos.forEach(e => {
        e.style.opacity = 1;
        e.dataset.animado = "true";
    });
}

// =================================================================================== //

function verificarRolagem() {
    const pontoDisparo = window.innerHeight * 0.85;

    elementos.forEach(elemento => {
        const posicaoElemento = elemento.getBoundingClientRect().top;

        if (elemento.dataset.animado === "true") return;

        if (posicaoElemento < pontoDisparo) {
            elemento.dataset.animado = "true";

            elemento.classList.add("animate__animated", "animate__fadeInUp");
            elemento.style.opacity = 1;

            elemento.addEventListener("animationend", () => {
                elemento.classList.remove("animate__animated", "animate__fadeInUp");
            }, { once: true });
        }
    });
}

window.addEventListener("scroll", verificarRolagem);
window.onload = verificarRolagem;

// =================================================================================== //

// BOTÕES QUE LEVAM O USUÁRIO PARA TAL LUGAR DITO NO BOTÃO
document.getElementById("btn-lojas").addEventListener("click", () => {
    window.scrollTo({
        top: 10000,      // pixel exato
        behavior: "smooth"
    });
});
document.getElementById("btn-cardapio").addEventListener("click", () => {
    window.scrollTo({
        top: 1000,
        behavior: "smooth"
    })
})
