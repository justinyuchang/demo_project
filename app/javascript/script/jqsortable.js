import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
    $( function() {
        $( "#sortable1, #sortable2" ).sortable({
          connectWith: ".connectedSortable"
        }).disableSelection();
      } );
})