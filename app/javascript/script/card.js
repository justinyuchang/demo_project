import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
// Create card 
    $('[data-role ="card-button"]').click(function(){
      console.log("已觸發")
      let board_url = location.pathname.split('/')
      let board_id =  board_url[board_url.length - 1]
      let list_name = $(this).parent().siblings().children("h4").text();
      let card_text = $(this).siblings("textarea").val();
      console.log(board_url)
      console.log(card_text)
      console.log(list_name)
      console.log(board_id)
      axios({
          method: 'post',
          url: `/lists/cards`,
          data: {
            card: {
              card_text: card_text,
              board_id: board_id,
              list_name: list_name
            }
          }
        })
    });
// Click card and get data from server
  $('[data-role ="btn card-name"]').click(function(event){
    console.log("已觸發")
    let card_id = $(this).children("span").text().replace(/\s+/g,"");
    console.log(card_id)
    axios({
      method: 'get',
      url: `/lists/cards/${card_id}`,
    })
    .then(function (response) {
      console.log(response)
      console.log(response.data)
      let card_item = response.data.card
      console.log(card_item) 
      let card_comment = response.data.comments
      console.log(card_comment)
// Get comment's content 
      let comments = response.data.comments.map(comment => comment.content)
      console.log(comments)
      let comment = comments; 
        for (var i = 0; i < comments.length; i++) {
        $('[data-role ="comment-area"]').append(`<div class="bg-light mb-1">${comment[i]}</div>`);
      }
      $('[data-role ="card-focus-id"]').text(`${card_item.id}`)
      $('[data-role ="card-title"]').text(`${card_item.title}`)
      $('[data-role ="card-description"]').val(`${card_item.description}`)
      $('[data-role ="card-due-date"]').val(`${card_item.due_date}`)
      $('[data-role ="card-archived"]').val(`${card_item.archived}`)
      $('[data-role ="card-tags"]').val(`${card_item.tags}`)
    })
  });
// Update card 
  $('[data-role ="card-update"]').click(function(){
    console.log("已觸發")
    let card_id = $('[data-role ="card-focus-id"]').text()
    let card_description = $('[data-role ="card-description"]').val()
    let card_due_date = $('[data-role ="card-due-date"]').val()
    let card_archived = $('[data-role ="card-archived"]').val()
    let card_tags = $('[data-role ="card-tags"]').val()
    console.log(card_id)
    console.log(card_description)
    console.log(card_due_date)
    console.log(card_archived)
    console.log(card_tags)
    axios({
      method: 'patch',
      url: `/lists/cards/${card_id}`,
      data: {
        description: card_description,
        due_date: card_due_date,
        archived: card_archived,
        tags: card_tags
      }
    })
  });
// Send Comment
  $('[data-role ="comment-send"]').click(function(){
    let card_id = $('[data-role ="card-focus-id"]').text()
    let card_comment = $(this).siblings("textarea").val();    
    console.log(card_id)
    console.log(card_comment)
    axios({
      method: 'post', 
      url: `/lists/cards/${card_id}/comments`,
      data: {
        content: card_comment
      }
    })
    .then(function(){
      $('[data-role ="comment-area"]').append(`<div class="bg-light mb-1">${card_comment}</div>`)
    })
    .then(function(){
      $('[data-role ="comment-input"]').val("")
    })
  });
/////////////////////////////////////////////
})