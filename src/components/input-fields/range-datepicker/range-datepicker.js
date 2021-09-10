import './range-datepicker.sass'

import { DateRangePicker } from 'vanillajs-datepicker'
//добавляет русский
import { Datepicker } from 'vanillajs-datepicker'
import ru from 'vanillajs-datepicker/locales/ru'
Object.assign( Datepicker.locales, ru );


$( document ).ready(function() {

//DATE PICKERS-----------------------------

      const $picDateElems = $('input.js-range-datepicker');
      const $picRangeElems = $('div.js-range-datepicker');

      $picDateElems.each(function () {
            let picDate = new Datepicker(this, {
                        language: 'ru',
                        prevArrow: '',
                        nextArrow: '',
                        clearBtn: true,
                        todayHighlight: true,
                        orientation: 'bottom',
                        minDate: 'today',
                        format: 'd M',
                        maxNumberOfDates: 2,
                        dateDelimiter: ' - ',
                        disableTouchKeyboard: true,
                        showOnFocus: false,
                  })

            $('.clear-btn').after(`<button type="submit" class="button-base --mini">применить</button>`);

            $('.datepicker').find('button[type=submit]').on('click', function () {
                  picDate.hide();
                  $(picDate.inputField).blur();
            })

          let windowWidth = $( window ).width();

          $(picDate.element).on('focus', () => {
            let widthPicker = $(picDate.element).css('width').replace('px','');
            let widthCell = (windowWidth > 475) ? (widthPicker - 40) / 7 : (widthPicker - 20) / 7;

              $(picDate.picker.element).width(`${widthPicker}px`);
              $(picDate.picker.element).find('.datepicker-cell').height(`${widthCell}px`);

          })
      })

      $picRangeElems.each(function () {

            let picRange = new DateRangePicker(this, {
                  language: 'ru',
                  prevArrow: '',
                  nextArrow: '',
                  clearBtn: true,
                  todayHighlight: true,
                  orientation: 'bottom',
                  minDate: 'today',
                  disableTouchKeyboard: true,
                  showOnFocus: false,
            })

            $('.clear-btn').after(`<button type="submit" class="button-base --mini">применить</button>`);
            $('.datepicker').find('button[type=submit]').on('click', function () {

                  for (let i in picRange.datepickers) {
                        picRange.datepickers[i].hide();
                       $(picRange.datepickers[i].inputField).blur();
                  }
            })

        let windowWidth = $( window ).width();

        if (windowWidth > 475) {
          $(picRange.inputs[0]).on('focus', () => picRange.setOptions({orientation: 'bottom left'}));
          $(picRange.inputs[1]).on('focus', () => picRange.setOptions({orientation: 'bottom right'}));
        }

        for (let i in picRange.datepickers) {
          $(picRange.datepickers[i].inputField).on('focus', () => {
            let widthPicker = $(picRange.element).css('width').replace('px','');
            let widthCell = (windowWidth > 475) ? (widthPicker - 40) / 7 : (widthPicker - 20) / 7;

            for (let j in picRange.datepickers) {
              $(picRange.datepickers[j].picker.element).width(`${widthPicker}px`);
              $(picRange.datepickers[j].picker.element).find('.datepicker-cell').height(`${widthCell}px`);
            }
          })
        }
      })
})