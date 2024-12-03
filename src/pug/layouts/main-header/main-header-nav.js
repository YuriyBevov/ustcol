const opener = document.querySelector('.main-nav-opener');
const closer = document.querySelector('.main-nav-closer');
const nav = document.querySelector('.main-nav');
const inner = nav.querySelector('.main-nav__wrapper');
const body = document.querySelector('body');

function focusTrap(el, initialFocusedEl = null) {
  const focusableElements = [
    'a[href]',
    'input',
    'select',
    'textarea',
    'button',
    'iframe',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])'
  ];

  const firstFocusableElement = el.querySelectorAll(focusableElements)[0];
  const focusableContent = el.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  let onBtnClickHandler = (evt) => {
      let isTabPressed = evt.key === 'Tab' || evt.key === 9;

      if(evt.key === 'Escape') {
          document.removeEventListener('keydown', onBtnClickHandler);
      }

      if (!isTabPressed) {
          return;
      }

      if (evt.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              evt.preventDefault();
          }
      } else {
          if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              evt.preventDefault();
          }
      }
  }

  document.addEventListener('keydown', onBtnClickHandler);

  initialFocusedEl  ?
  initialFocusedEl.focus() : firstFocusableElement.focus();
}

if (opener && nav) {

  const closeNav = () => {
    nav.classList.add('collapsing');

    setTimeout(() => {
      nav.classList.remove('active');
      nav.classList.remove('collapsing');
    }, 300);

    nav.removeEventListener('click', onOverlayClickCloseNav);
    closer.removeEventListener('click', closeNav);
    window.removeEventListener('keydown', onEscClickCloseNav);

    body.style.overflow = '';

    document.querySelectorAll('.expanded').forEach(item => {
      item.classList.remove('expanded');
    });
  }

  const onOverlayClickCloseNav = (evt) => {
    if(evt.target === nav) {
      closeNav();
    }
  }

  const onEscClickCloseNav = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      closeNav();
    }
  }

  const onClickOpenNav = () => {
    nav.classList.add('active');
    nav.addEventListener('click', onOverlayClickCloseNav);
    closer.addEventListener('click', closeNav);
    window.addEventListener('keydown', onEscClickCloseNav);

    body.style.overflow = 'hidden';
    focusTrap(inner, closer);
  }

  opener.addEventListener('click', onClickOpenNav);

  window.addEventListener('resize', () => {
    if(window.innerWidth > 1239) {
      body.style.overflow = '';

      nav.classList.contains('active')
        ? nav.classList.remove('active')
        : null;
    }
  });
}
