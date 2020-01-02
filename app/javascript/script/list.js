import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
//list_create
    $('[data-role="js-list"]').on("click",'[data-role="btn list-create"]',function(event){
      event.preventDefault();
      const board_url = location.pathname.split('/')
      const board_id =  board_url[board_url.length - 1]
      let api_list_title = $('[data-role="api-list-title"]').val();
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