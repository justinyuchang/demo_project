import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
    $( '[data-role="js-list"]' ).on("mousemove" ,function(){
      $( '[data-role="card-group"]' ).sortable({
        items : 'div:not(.sortable-hidden)',
        connectWith: "#card-sortable",
        connectWith: '[data-role="card-group"]',
        update: function(event, ui){
          let list_id = $(this).parents('[data-role="card-wrapper"]')
                                               .siblings('[data-role= "list-item"]')
                                               .find('[data-role="list-id"]')
                                               .attr("val") 
          let card_all = $(this).sortable('toArray')
          console.log(card_all)
          // axios({
          //   method: 'patch',
          //   url: '/lists/cards/sort',
          //   data: {card :$(this).sortable('toArray'),
          //                list_id :list_id
          //   }
          // })
        }
      })
    })
})