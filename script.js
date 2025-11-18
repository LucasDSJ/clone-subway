// animação de entrada ao rolar — estilo fade-in
const elementos = document.querySelectorAll(".scroll-anim");

function verificarRolagem() {
    const pontoDisparo = window.innerHeight * 0.85;

    elementos.forEach(elemento => {
      const posicaoElemento = elemento.getBoundingClientRect().top;

      if (posicaoElemento < pontoDisparo) {
        elemento.classList.add("animate__animated", "animate__fadeInUp");
        elemento.style.opacity = 1;
      }
    });
}

window.addEventListener("scroll", verificarRolagem);
window.onload = verificarRolagem;
