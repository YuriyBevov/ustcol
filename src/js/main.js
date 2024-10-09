const btns = document.querySelectorAll('.page-sidebar button');

if(btns) {
  const content = document.querySelector('.page-content');
  btns.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      const type = evt.target.dataset.type;

      if(type === 'desktop') {
        content.style.maxWidth = "100%";
      }

      if(type === 'tablet') {
        content.style.maxWidth = "768px";
      }

      if(type === 'mobile') {
        content.style.maxWidth = "534px";
      }
    })
  });
}
