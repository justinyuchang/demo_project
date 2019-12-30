import axios from 'helpers/axios';
$(document).on("turbolinks:load", function(){
////////////////////////////////////////
    $('[data-role="list-create"]').click(function(){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        let list_title = $('[data-role="list-title"]').val();
        axios({
            method: 'post',
            url: `/boards/${board_id}/lists`,
            data: {
              list: {
                title: list_title
              }
            }
          })
    })
})