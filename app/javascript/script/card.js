import axios from 'helpers/axios';
$(document).on("turbolinks:load", function(){
    console.log("card-js input")
    $('[data-role="card-button"]').click(function(){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        let list_name = $(this).parent().siblings().children("h4").text();
        let card_text = $(this).siblings("textarea").val();
        console.log(card_text)
        console.log(list_name)
        console.log(board_id)
        axios({
            method: 'post',
            url: '/lists/cards',
            data: {
              list_name: list_name,
              card: card_text,
              board_id: board_id
            }
          });
    })
})