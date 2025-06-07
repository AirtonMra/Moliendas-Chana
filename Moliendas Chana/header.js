const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.pageYOffset === 0) {
    header.classList.remove('hide-header');
  } else {
    header.classList.add('hide-header');
  }
});
