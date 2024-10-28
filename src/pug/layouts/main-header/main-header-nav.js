const burger = document.querySelector('.burger');
const underlay = document.querySelector('main');

// Переделать
if (burger) {

  const onClickCloseNav = () => {
    burger.classList.remove('active');
    underlay.removeEventListener('click', onClickCloseNav);
  }

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');

    underlay.addEventListener('click', onClickCloseNav);
  });
}
