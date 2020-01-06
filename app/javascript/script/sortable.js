import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
    $( '[data-role="js-list"]' ).on("mousemove" ,function(){
      $( '[data-role="card-group"]' ).sortable({
        connectWith: "#card-sortable",
        connectWith: '[data-role="card-group"]',
        cursor: "move",
        items: 'div:not(.sortable-hidden)',
        delay: 150,
        revert: true,
        update: function(event, ui){
          let list_id = $(this).parents('[data-role="card-wrapper"]')
                                               .siblings('[data-role= "list-item"]')
                                               .find('[data-role="list-id"]')
                                               .attr("val") 
          let card_id = $(ui.item[0]).attr("id")
          let next_card_id  = $(ui.item[0]).next().attr("id") || "no"
          let prev_card_id  = $(ui.item[0]).prev().attr("id") || "no"
          axios({
            method: 'patch',
            url: '/lists/cards/sort',
            data: {card: [{card_id: card_id},
                                      {next_card_id: next_card_id},
                                      {prev_card_id: prev_card_id}],
                         list_id: list_id
            }
          })
        }
      })
    })
})