import 'ion-rangeslider'

import './range-slider.sass'



$( document ).ready(function() {

//SLIDER ------------------------

   $(".js-range-slider").ionRangeSlider({
      type: 'double',
      min: 1000,
      max: 15000,
      from: 5000,
      to: 10000,
      step: 500,
      min_interval: 1000,
      hide_min_max: true,
      postfix: '₽',
      hide_from_to: true,
      skin: 1,
      onStart: function (data) {
         $('.js-range-slider__info').prop('innerText', data.from_pretty + "₽ - " + data.to_pretty + "₽");
      },
      onChange: function (data) {
         $('.js-range-slider__info').prop('innerText', data.from_pretty + "₽ - " + data.to_pretty + "₽");
      },
   });
});