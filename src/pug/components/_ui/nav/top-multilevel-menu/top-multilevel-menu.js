
const items = document.querySelectorAll('.main-nav__list-item > a > svg');
const innerItems = document.querySelectorAll('.top-multilevel-menu__list-item > a > svg');

if(items.length) {
  items.forEach(item => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.currentTarget.closest('.main-nav__list-item').classList.toggle('expanded');
    });
  });
}

if(innerItems.length) {
  innerItems.forEach(item => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.currentTarget.closest('.top-multilevel-menu__list-item').classList.toggle('expanded');
    });
  });
}

window.addEventListener('keydown', (evt) => {
  if(evt.key === 'Enter' && evt.target.classList.contains('main-nav-item-expander')) {
    evt.preventDefault();
    evt.target.closest('li').classList.toggle('expanded');
  }
});
