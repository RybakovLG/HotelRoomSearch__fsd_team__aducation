
//STARS RATING-----

$('.stars-rating__select').barrating();


//SLIDER ------

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



//PAGINATION-------------

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
  let isPeople = ($(this).parent().hasClass('--for-people')) ? true : false ;


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
});


//Вызываем клики для UI
$('.ui-dropdowns-list .dropdown__expand-check').trigger('click');




// LIKE BUTTONS------------------------

$('.like-btn input').on('click',function (){

  setTimeout(() => {

    $(this).siblings('.like-btn__sum').text((i, text) => {
      return $(this).prop('checked') ? ++text : --text;

    })}, 250); });
