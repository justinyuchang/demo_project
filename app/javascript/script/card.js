import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){

    $('[data-role="card-create-btn"]').on("click", function(event){
      event.preventDefault();
      const board_url = location.pathname.split('/')
      const board_id =  board_url[board_url.length - 1]
      let list_id = $(this).parents('[data-role="card-wrapper"]')
                           .siblings('[data-role= "list-item"]')
                           .find('[data-role="list-id"]')
                           .attr("val")
      let card_text = $(this).parents('[data-role="card-btn"]')
                             .siblings('[data-role="card-input"]')
                             .find("textarea")
                             .val()
      axios({
          method: 'post',
          url: `/lists/cards`,
          data: {
            board_id: board_id,
            card: {
              title: card_text,
              list_id: list_id,
            }
          }
        })
    });
// Get card 
  $('[data-role="card-group"]').on("click", '[data-role="card-title"]', function(event){
    console.log("已觸發")
    event.preventDefault();
    let card_id = $(this).siblings('[data-role="card-id"]').attr('val');
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
      $('[data-role ="comment-area"]').append(`<div class="bg-light mb-1">${comments}</div>`);
      $('[data-role ="card-focus-id"]').text(`${card_item.id}`)
      $('[data-role ="card-inner_title"]').text(`${card_item.title}`)
      $('[data-role ="card-description"]').val(`${card_item.description}`)
      $('[data-role ="card-due-date"]').val(`${card_item.due_date}`)
      $('[data-role ="card-archived"]').val(`${card_item.archived}`)
      $('[data-role ="card-tags"]').val(`${card_item.tags}`)
    })
  });
// Update card 
  $('[data-role="card-update"]').click(function(){
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