import axios from 'helpers/axios';

$(document).ready( function() {
    $( '[data-role="js-list"]' ).on("mousemove" ,function(){
      $( '[data-role="card-group"]' ).sortable({
        connectWith: "#card-sortable",
        connectWith: '[data-role="card-group"]',
        cursor: "move",
        items: 'div:not(.sortable-hidden)',
        delay: 150,
        revert: true,
        update: function(event, ui){
          let card_array =$(this).sortable('toArray')
          let list_id = $(this).parents('[data-role="card-wrapper"]')
                                               .siblings('[data-role= "list-item"]')
                                               .find('[data-role="list-id"]')
                                               .attr("val") 
          let board_url = location.pathname.split('/')
          let board_id =  board_url[board_url.length - 1]
          let card_id = $(ui.item[0]).attr("id")
          let card_index = card_array.indexOf(card_id)
          if( card_index == 0 ){
             var next_card_id = (card_array[card_index + 1]) || null
             var  prev_card_id = null
          }else if(card_index == ((card_array.length) - 1)){
            var next_card_id = null
            var  prev_card_id = (card_array[card_index -1 ]) || null
          }else{
            var next_card_id = (card_array[card_index + 1])
            var  prev_card_id = (card_array[card_index -1 ])
          }
          if(card_array.includes(card_id)){
            axios({
              method: 'patch',
              url: '/lists/cards/sortcard',
              data: {card: card_id,
                            next_card_id: next_card_id,
                            prev_card_id: prev_card_id,
                            list_id: list_id,
                            card_array: card_array,
                            board_id: board_id
              }
            })
          }
        }
      })
    });
    $( '#js-list-sortable' ).sortable({
      delay: 150,
      cursor: "move",
      revert: true,
      placeholder: "sortable-placeholder",
      tolerance: "pointer",
      update: function(event, ui){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        let list_array =$(this).sortable('toArray').map(function(array){
          let num =array.replace(/(list_)/, "")
          return parseInt(num)
        })
        let list_id = parseInt($(ui.item[0]).attr("id").replace(/(list_)/, ""))
        let list_index = list_array.indexOf(list_id)
        if( list_index == 0 ){
          var next_list_id = (list_array[list_index + 1]) || null
          var  prev_list_id = null
       }else if(list_index == ((list_array.length) - 1)){
         var next_list_id = null
         var  prev_list_id = (list_array[list_index -1 ]) || null
       }else{
         var next_list_id = (list_array[list_index + 1])
         var  prev_list_id = (list_array[list_index -1 ])
       }
       axios({
        method: 'patch',
        url: `/boards/${board_id}/lists/sortlist`,
        data: {list: list_id,
                      next_list_id: next_list_id,
                      prev_list_id: prev_list_id,
          }
        })
      }
    })
})