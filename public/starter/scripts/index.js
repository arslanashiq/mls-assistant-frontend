/*global Swiper */

/* initialize swiper */
var swiper = new Swiper('.swiper-container', {
  spaceBetween: 0,
  centeredSlides: true,
  speed: 500,
  effect: 'fade',
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});