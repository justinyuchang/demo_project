import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
    $( '[data-role="js-list"]' ).on("mousemove" ,function(){
      $( '[data-role="card-group"]' ).sortable({
        items : 'div:not(.sortable-hidden)',
        connectWith: "#card-sortable",
        connectWith: '[data-role="card-group"]'
      })
    })
})