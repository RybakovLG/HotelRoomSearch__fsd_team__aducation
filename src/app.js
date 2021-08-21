
//STARS RATING-----

$('.stars-rating__select').barrating();


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
  onStart: function(data) {
    $('.js-range-slider__info').prop('innerText' ,data.from_pretty +"₽ - " + data.to_pretty + "₽");
  },
  onChange: function(data) {
    $('.js-range-slider__info').prop('innerText' ,data.from_pretty +"₽ - " + data.to_pretty + "₽");
  },
});



//PAGINATION-------------------------------

$('.pagination-holder').pagination({
  items: 15,
  itemsOnPage: 1,
  displayedPages: 3,
  prevText: '',
  nextText: '->',
  edges: 1,
  cssStyle: ''
});


//DROPDOWN-----------------------------------------

//общий объект

let dataDropdowns = {};


$('.dropdown__expand-check').one('click',function () {

  let itemsNames = $(this).parent().find('.exp-list__name'),
      itemsCounts = $(this).parent().find('.count__input'),
      mainLabel =  $(this).parent().find('.text-field'),
      toggleCheckbox = $(this);


//Проверяем считаем людей или комнаты
  let isPeople = !!($(this).parent().hasClass('--for-people')) ;


// Заполняем dataDropdowns
  for ( let i = 0; i < itemsNames.length; i++ ) {
    dataDropdowns[$(itemsNames[i]).text()] = $(itemsCounts[i]).val();
  }


// Убавляем кол-во по клику + выключаем минус при 0
  $(this).parent().find('.count__btn-minus').click(function () {

    let input = $(this).siblings('.count__input');
    let count = parseInt(input.val()) - 1;

    count = count < 0 ? 0 : count;
    input.val(count);

    if (count <= 0) {
      $(this).attr('disabled', '');
    }
    updDataDropdowns(input, count);
    renderData();
  });


//Прибавляем кол-во по клику + включаем минус
  $(this).parent().find('.count__btn-plus').click(function() {

    let input = $(this).siblings('.count__input'),
        count = parseInt(input.val()) + 1;

    input.val(count);
    $(this).siblings('.count__btn-minus').removeAttr('disabled');

    updDataDropdowns(input, count);
    renderData(input);
  });


//Кнопка ОЧИСТИТЬ
  let btnReset = $(this).parent().find('button[type="reset"]');

  $(btnReset).on('click', function () {

    $(mainLabel).text(`${defaultLabel}`);


  })

  //Кнопка ПРИМЕНИТЬ
  let btnSubmit = $(this).parent().find('button[type="submit"]');

  $(btnSubmit).on('click', function () {
    event.preventDefault();

    $(toggleCheckbox).removeAttr('checked');
    $(toggleCheckbox).prop('checked', false);

  })


//Синхронизируем данные с объектом
  function updDataDropdowns(input, count){

    let nameCount = input.parent().siblings('.exp-list__name').text();

    dataDropdowns[nameCount] = count;
  }


//Стандартное значение шапки
  let defaultLabel = $(mainLabel).text();


//Выводим данные в шапку
  function renderData() {

    if ( isPeople ) {
      let sumPeoples = 0;

      for ( let i = 0; i < itemsCounts.length; i++ ) {
        sumPeoples += +$(itemsCounts[i]).val();
      }

      if (sumPeoples !== 0) {

        $(mainLabel).text(`${sumPeoples} гостей`)
        $(btnReset).removeClass('visibility-hidden');

      } else {

        $(mainLabel).text(`${defaultLabel}`);
        $(btnReset).addClass('visibility-hidden');
      }
    } else {

      $(mainLabel).text(`${dataDropdowns['спальни']} спальни, ${dataDropdowns['кровати']} кровати...`)
    }
  }


  //Клик вне элемента закрывает дропдаун
    $(document).on('click', function(e){
    if ( $(e.target).closest('.dropdown').length ) {
      // клик внутри элемента
      return;
    }
    // клик снаружи элемента
    $(toggleCheckbox).removeAttr('checked');
    $(toggleCheckbox).prop('checked', false);
  });
});


//Вызываем клики для UI
$('.ui-dropdowns-list .dropdown__expand-check').trigger('click');


// LIKE BUTTONS------------------------

$('.like-btn input').on('click',function (){

  setTimeout(() => {

    $(this).siblings('.like-btn__sum').text((i, text) => {
      return $(this).prop('checked') ? ++text : --text;

    })}, 250); });


//DATE PICKERS-----------------------------

//RANGE----------------------

$('.range-datepicker').each(function (){
  new DateRangePicker(this, {

    language: 'ru',
    prevArrow: '',
    nextArrow: '',
    clearBtn: true,
    todayHighlight: true,
  })
});

//UI-DATEPICKER----------------

const UIcalendar = document.getElementById('ui-calendar');
const UIrangepicker = new DateRangePicker(UIcalendar, {

  language: 'ru',
  prevArrow: '',
  nextArrow: '',
  clearBtn: true,
  todayHighlight: true,
  container: '#ui-calendar',

});
$(UIcalendar).find('.datepicker:first').addClass('active static-pos');

//Установка выбранных дат для UI
UIrangepicker.setDates( '19.08.2019' , '23.08.2019' );
$(UIcalendar).find('.datepicker:first').find('span[data-date=1565211600000]').addClass('today');

//Вставка кнопки применить
$('.clear-btn').after(`<button type="submit" class="button-base --mini">применить</button>`);

//Закрывает Дэйтпикер при клике
$('.datepicker').find('button[type=submit]').on('click', function () {

  $(this).closest('.datepicker').removeClass('active');
});


//SLIDER on ROOM CARD --------------------

$('.glider').each( function () {

  const prevBtn = $(this).siblings('.glider-btn-prev')[0],
        nextBtn = $(this).siblings('.glider-btn-next')[0],
        dots = $(this).siblings('.dots')[0];

  new Glider(this, {
      slidesToShow: 1,
      dots: dots,
      scrollLock: true,
      duration: 3,
      scrollLockDelay: 500,
      rewind: true,
      arrows: {
        prev: prevBtn,
        next: nextBtn
      }
    });
    }
);
