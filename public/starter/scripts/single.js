/*global Swiper, IScroll, isPassive, addEventListener */

(function () {
  'use strict';
  /* initialize swiper */
  var swiper, swiperThumbs, thumb, scrollerX, i, $;
  
  swiper = new Swiper('.swiper-container', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 500,
    effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-thumbs',
      clickable: true,
      renderBullet: function (index, className) {
        return '<li class="swiper-thumb ' + className + ' slide-' + index + '"></li>';
      }
    }
  });
  
  /* initialize iscroll for swiper thumbs */
  swiperThumbs = new IScroll('#swiper-thumb-wrapper', {
    eventPassthrough: true,
    scrollX: true,
    scrollY: false,
    mouseWheel: true
  });
  window.onload = function () {
    function isPassive() {
      var supportsPassiveOption = false;
      try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () {
            supportsPassiveOption = true;
          }
        }));
      } catch (e) {}
      return supportsPassiveOption;
    }

    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, isPassive() ? {
      capture: true,
      passive: true
    } : true);
  };
  
  /* go to the next or previous thumbnail in line */
  thumb = document.querySelectorAll('.swiper-thumb');
  scrollerX = swiperThumbs.x;
  /*
  for (i = 0; i < thumb.length; i += 1) {
  
  } 
  thumb[i].addEventListener('click', function () {
    scrollerX += -149; // need a conditional here for scrolling to proper position
    swiperThumbs.scrollTo(scrollerX, 0);
  });
  */
}());