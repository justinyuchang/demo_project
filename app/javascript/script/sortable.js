import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
  $( function() {
    $( '[data-role="js-list"]' ).sortable();
    // 
  } );
})