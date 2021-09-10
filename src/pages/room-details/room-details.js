import {importCommon, importContext, importHeaderFooter} from '../imports';

importCommon();
importHeaderFooter();

importContext(require.context('@components/input-fields/range-datepicker/', true, /\.(js)$/));
importContext(require.context('@components/input-fields/calc-dropdown/', true, /\.(js)$/));
importContext(require.context('@components/forms/get-room-card', true, /\.(js|sass)$/));


import './room-details.sass';


// LIKE BUTTONS------------------------

const $likeElems = $('.like-btn input');

$likeElems.on('click',function (){

  setTimeout(() => {

    $(this).siblings('.like-btn__sum').text((i, count) => {
      return $(this).prop('checked') ? ++count : --count;

    })}, 250); });