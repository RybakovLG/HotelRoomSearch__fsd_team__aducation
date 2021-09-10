import './Glider.js-master/glider.min'
import './Glider.js-master/glider.min.css'

import 'jquery-bar-rating'

$( document ).ready(function() {

//STARS RATING-----

const ratingElems = $('.stars-rating__select');

ratingElems.barrating();

//SLIDER on ROOM CARD --------------------


const $gliderElems = $('.glider');

$gliderElems.each( function () {

      const prevBtn = $(this).siblings('.glider-btn-prev')[0],
          nextBtn = $(this).siblings('.glider-btn-next')[0],
          dots = $(this).siblings('.dots')[0];

      new Glider(this, {
        slidesToShow: 1,
        dots: dots,
        scrollLock: true,
        duration: 5,
        scrollLockDelay: 50,
        rewind: true,
        arrows: {
          prev: prevBtn,
          next: nextBtn
        }
      });
    }
);

});