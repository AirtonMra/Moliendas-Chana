let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 70) {
    // Scroll hacia abajo → ocultar
    header.classList.add('hide-header');
  } else {
    // Scroll hacia arriba → mostrar
    header.classList.remove('hide-header');
  }

  lastScroll = currentScroll;
});