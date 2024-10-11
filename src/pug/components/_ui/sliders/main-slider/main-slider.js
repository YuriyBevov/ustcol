import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const sliders = document.querySelectorAll('.main-slider');

if(sliders.length) {
  sliders.forEach((slider) => {
    new Swiper(slider, {
      modules: [Navigation, Pagination],
      slidesPerView: 'auto',
      spaceBetween: 30,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true
      },
    });
  });
}



