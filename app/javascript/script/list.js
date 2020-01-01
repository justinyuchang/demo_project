import axios from 'helpers/axios';
import board_id from 'helpers/board_url';

$(document).on("turbolinks:load", function(){
//list_create
    $('[data-role="btn list-create"]').on("click",function(event){
      event.preventDefault();
      let api_list_title = $('[data-role="api-list-title"]').val();
      console.log(api_list_title)
      axios({
          method: 'post',
          url: `/boards/${board_id}/lists`,
          data: {
            list: {
              title: api_list_title
            }
          }
        })
  })
})