let currentIndex = 0; // Começa no primeiro slide (original)
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Função para mover os slides
function moveSlide(direction) {
    currentIndex += direction;

    // Se chegar ao último slide (clonado), ir para o primeiro slide original
    if (currentIndex === totalSlides) {
        currentIndex = 1; // Volta para o primeiro slide original
        document.querySelector('.carousel-container').style.transition = 'none'; // Remove a transição
        document.querySelector('.carousel-container').style.transform = `translateX(-${currentIndex * 100}%)`; // Ajusta a posição
    }

    // Se chegar ao primeiro slide (clonado), ir para o último slide original
    if (currentIndex < 0) {
        currentIndex = totalSlides - 2; // Vai para o último slide original
        document.querySelector('.carousel-container').style.transition = 'none'; // Remove a transição
        document.querySelector('.carousel-container').style.transform = `translateX(-${currentIndex * 100}%)`; // Ajusta a posição
    }

    // Adiciona a transição para o movimento normal
    document.querySelector('.carousel-container').style.transition = 'transform 0.5s ease-in-out';
    document.querySelector('.carousel-container').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Adicione eventos de clique para os botões
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));

// Muda automaticamente para o próximo slide a cada 5 segundos
setInterval(() => {
    moveSlide(1); // Muda para o próximo slide
}, 5000); // 5000 milissegundos = 5 segundos