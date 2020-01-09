import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
// Card create 
    $('[data-role="js-list"]').on("click",'[data-role="card-create-btn"]', function(event){
      event.preventDefault();
      let board_url = location.pathname.split('/')
      let board_id =  board_url[board_url.length - 1]
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
          url: '/lists/cards',
          data: {
            board_id: board_id,
            card: {
              title: card_text,
              list_id: list_id,
            }
          }
        })
        .then(function(response){
          $("textarea").val(" ")
        })
    });
// Get card 
  $('[data-role="js-list"]').on("click", '[data-role="card-title"]', function(event){
    event.preventDefault();
    let card_id = $(this).siblings('[data-role="card-id"]').attr('val');
    console.log(card_id)
    axios({
      method: 'get',
      url: `/lists/cards/${card_id}`,
    })
    .then(function (response) {
      let card_item = response.data.card
      let card_comment = response.data.comments
      let card_assignee = response.data.assignee
      console.log(card_item.tags)
      let card_tags = card_item.tags
      console.log(card_tags)
      let result = ''
      card_comment.forEach(function(comment){
        result = result + `<div class="bg-light mb-1">${comment.content}</div>`
      })
      $('[data-role ="comment-area"]').html(result);
      $('[data-role ="card-focus-id"]').text(`${card_item.id}`)
      $('[data-role ="card-inner_title"]').text(`${card_item.title}`)
      $('[data-role ="card-description"]').val(`${card_item.description}`)
      $('[data-role ="card-due-date"]').val(`${card_item.due_date}`)
      // $('[data-role ="card-archived"]').val(`${card_item.archived}`)
      let taglist = ''
      card_tags.forEach(function(tag){
        taglist = taglist + `<span id="tags"  class="badge badge-light">${tag.name}</span>`
      })
      $('#tags').html(taglist);
      card_assignee.forEach(function(assignee){
        $('.assignee').html(`<div class="assignee">${assignee.email}</div>`)
      })
      $('#Carditem').modal('show')
    })
  });
// Update card 
  $('[data-role="card-update"]').click(function(){
    console.log("Update card")
    let card_id = $('[data-role ="card-focus-id"]').text()
    let card_description = $('[data-role ="card-description"]').val()
    let card_due_date = $('[data-role ="card-due-date"]').val()
    // let card_archived = $('[data-role ="card-archived"]').val()
    axios({
      method: 'patch',
      url: `/lists/cards/${card_id}`,
      data: {
        description: card_description,
        due_date: card_due_date,
        tag_list: cardTags
      }
    })
    .then(function(response){
      let status = response.data.status
      if(status == "ok"){
        $('#Carditem').modal('hide')
      }
    })
  });
// Send Comment
  $('[data-role ="comment-send"]').click(function(){
    let card_id = $('[data-role ="card-focus-id"]').text()
    let card_comment = $(this).siblings("textarea").val();    
    axios({
      method: 'post', 
      url: `/lists/cards/${card_id}/comments`,
      data: {
        content: card_comment
      }
    })
    .then(function(response){
      if (response.status === 200) {
        let data = response.data
        $('[data-role ="comment-area"]').append(`<div class="bg-light mb-1">${data.content}</div>`)
        return response.data
      } else {
        throw 'Error'
      }
    })
    .then(function(){
      $('[data-role ="comment-input"]').val("")
    })
  });
// Card assignee
  $('.dropdown-item').on("click", function(evt){
    let cardId = $('[data-role ="card-focus-id"]').text()
    let userId = $(this).children('span').attr('data-memberid')
    axios({
      method: 'put',
      url: `/lists/cards/${cardId}/assign`,
      data: {
        userId: userId,
      }
    })
    .then(function(response){
      if (response.status === 200){
        let data = response.data
        data.forEach(function(assignee){
          $('.assignee-list').html(`<div class="assignee">${assignee.email}</div>`)
        })
      } else {
          $('.assignee').remove()
      }
    })
  })
// Add tags  
  $('[data-role ="tag-send"]').click(function(){
    console.log('Add tags');
    let cardId = $('[data-role ="card-focus-id"]').text()
    let cardTags = $(this).siblings("input").val()
    axios({
      method: 'put',
      url: `/lists/cards/${cardId}/tagging`,
      data: {
        cardTags: cardTags, 
      }
    })
    .then(function(response){
      console.log(response)
      if (response.status === 200){
        let data = response.data
        data.forEach(function(tag){
          $('.tag-list').append(`<span id="tags"  class="badge badge-light">${tag.name}</span>`)
        })
      } 
    })
  })
/////////////////////////////////////////////
})