(function () {

    const trilha = document.getElementById('carousel-track');    // Faixa onde os slides se movem
    const btnAnterior = document.getElementById('carousel-prev'); // Botão ‹
    const btnProximo = document.getElementById('carousel-next');  // Botão ›
    const containerDots = document.getElementById('carousel-dots'); // Contêiner dos indicadores (bolinhas)

    const slides = Array.from(trilha.children);
    const totalSlides = slides.length;

    let indiceAtual = 0;   // Slide mostrado no momento
    let intervaloAuto = null;

    const AUTO_PLAY = true;     // ATIVAR ou NÃO autoplay
    const DELAY_AUTO = 6000;    // Tempo entre slides durante autoplay (ms)

    // CRIAÇÃO DOS INDICADORES
    function criarDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot w-3 h-3 rounded-full bg-white/50 focus:outline-none';
            dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
            dot.dataset.index = i;

            containerDots.appendChild(dot);

            dot.addEventListener('click', () => {
                irParaSlide(i);
                reiniciarAutoPlay();
            });
        }
    }

    // ATUALIZAÇÃO DO CARROSSEL
    function atualizarCarrossel() {
        // MOVE A TRILHA PARA EXIBIR O SLIDE CORRETO
        trilha.style.transform = `translateX(-${indiceAtual * 100}%)`;

        // ATUALIZA O ESTADO VISUAL DOS INDICADORES 
        const dots = containerDots.children;

        Array.from(dots).forEach((dot, i) => {
            dot.classList.toggle('bg-yellow-400', i === indiceAtual);
            dot.classList.toggle('bg-white/50', i !== indiceAtual);
        });
    }

    // NAVEGAÇÃO MANUAL
    function irParaSlide(i) {
        indiceAtual = (i + totalSlides) % totalSlides; // GARANTE UM LOOP INFINITO
        atualizarCarrossel();
    }

    function proximoSlide() {
        irParaSlide(indiceAtual + 1);
    }

    function slideAnterior() {
        irParaSlide(indiceAtual - 1);
    }

    // AUTOPLAY
    function iniciarAutoPlay() {
        if (!AUTO_PLAY) return; // VERIFICA SE AUTO_PLAY FOI MARCADO COMO true
        pararAutoPlay();
        intervaloAuto = setInterval(proximoSlide, DELAY_AUTO);
    }

    function pararAutoPlay() {
        if (intervaloAuto) clearInterval(intervaloAuto);
        intervaloAuto = null;
    }

    function reiniciarAutoPlay() {
        pararAutoPlay();
        iniciarAutoPlay();
    }

    // SUPORTE A TOQUE (SWIPE)
    function ativarSwipe() {
        let toqueInicialX = 0;
        let tocando = false;

        trilha.addEventListener('touchstart', (e) => {
            tocando = true;
            toqueInicialX = e.touches[0].clientX;
            pararAutoPlay();
        });

        trilha.addEventListener('touchend', (e) => {
            if (!tocando) return;
            const toqueFinalX = e.changedTouches[0].clientX;
            const distancia = toqueFinalX - toqueInicialX;
            tocando = false;

            if (Math.abs(distancia) > 50) {
                if (distancia < 0) proximoSlide();
                else slideAnterior();
            }
            reiniciarAutoPlay();
        });
    }

    // INICIALIZAÇÃO
    function iniciar() {
        criarDots();
        atualizarCarrossel();

        // BOTÕES QUE PASSAM OS SLIDES
        btnAnterior.addEventListener('click', () => {
            slideAnterior();
            reiniciarAutoPlay();
        });

        btnProximo.addEventListener('click', () => {
            proximoSlide();
            reiniciarAutoPlay();
        });

        // PAUSAR AUTOPLAY AO PASSAR O MOUSE (somente desktop)
        trilha.addEventListener('mouseenter', pararAutoPlay);
        trilha.addEventListener('mouseleave', iniciarAutoPlay);

        ativarSwipe();
        iniciarAutoPlay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }

})();
