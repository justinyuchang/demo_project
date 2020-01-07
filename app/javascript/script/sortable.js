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
          let sort_array =$(this).sortable('toArray')
          let list_id = $(this).parents('[data-role="card-wrapper"]')
                                               .siblings('[data-role= "list-item"]')
                                               .find('[data-role="list-id"]')
                                               .attr("val") 
          let card_id = $(ui.item[0]).attr("id")
          let card_index = sort_array.indexOf(card_id)
          // let prev_card_id =
          if( card_index == 0 ){
             var next_card_id = (sort_array[card_index + 1]) || "-1"
             var  prev_card_id = "-1"
          }else if(card_index == ((sort_array.length) - 1)){
            var next_card_id = "-1"
            var  prev_card_id = (sort_array[card_index -1 ]) || "-1"
          }else{
            var next_card_id = (sort_array[card_index + 1])
            var  prev_card_id = (sort_array[card_index -1 ])
          }
          console.log(card_index)
          console.log(`陣列=${sort_array}`)
          console.log(list_id)
          console.log(card_id)
          console.log(next_card_id)
          console.log(prev_card_id)
          axios({
            method: 'patch',
            url: '/lists/cards/sort',
            data: {card: card_id,
                          next_card_id: next_card_id,
                          prev_card_id: prev_card_id,
                          list_id: list_id,
                          card_array: sort_array
            }
          })
        }
      })
    })
})