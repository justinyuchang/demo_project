import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
  $( function() {
    $( '[data-role="card-group"]' ).sortable({
      connectWith: "#card-sortable",
      connectWith: '[data-role="card-group"]'
    }).disableSelection();

  } );
})