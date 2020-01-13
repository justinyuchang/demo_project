import axios from 'helpers/axios';

$(document).ready( function() {
// Card create 
    $('[data-role="js-list"]').on("click",'[data-role="card-create-btn"]', function(event){
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
          if (response.status == 200){
            $("textarea").val(" ")
          }
        })
    });
// Get card 
  $('[data-role="js-list"]').on("click", '[data-role="card-title"]', function(event){
    event.preventDefault();
    let cardId = $(this).siblings('[data-role="card-id"]').attr('val');
    console.log(cardId)
    axios({
      method: 'get',
      url: `/lists/cards/${cardId}`,
    })
    .then(function (response) {
      console.log(response)
      let carData = response.data
      let cardItem = carData.card
      let cardComment = carData.comments
      let cardAssignee = carData.assignee
      let cardTags = carData.taglist

      $('[data-role ="card-focus-id"]').text(`${cardItem.id}`)
      $('[data-role ="card-inner_title"]').text(`${cardItem.title}`)
      $('[data-role ="card-description"]').text(`${cardItem.description}`)

      let result = ''
      cardComment.forEach(function(comment){
        result = result + `<div class="comment-container">
        <div class="comment-header">
          <span class="author">${comment.user_id}</span>
          <span class="comment-time">${comment.created_at}</span>
        </div>  
        <div class="comment-body">
          <p>${comment.content}</p>
        </div>
      </div>`
      })
      $('[data-role ="comment-area"]').html(result);

      let tagList = ''
      cardTags.forEach(function(tag){
        tagList = tagList + `<span class="tags">${tag.name}</span>`
      })
      $('.tag-list').html(tagList);

      let cardMember = ''
      cardAssignee.forEach(function(assignee){
        cardMember = cardMember + `<span class="assignee">${assignee.email}</span>`
      })
      $('.card-member').html(cardMember);
      $('#Carditem').modal('show')
    })
  });
// Update card 
  $('[data-role="card-update"]').click(function(){
    console.log("Update card")
    let cardId = $('[data-role ="card-focus-id"]').text()
    let cardTitle = $('[data-role ="card-inner_title"]').text()
    let carDescription = $('[data-role ="card-description"]').text()
    // let card_due_date = $('[data-role ="card-due-date"]').val()
    axios({
      method: 'patch',
      url: `/lists/cards/${cardId}`,
      data: {
        title: cardTitle,
        description: carDescription
        // due_date: card_due_date,
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
    let cardId = $('[data-role ="card-focus-id"]').text()
    let cardComment = $(this).siblings("textarea").val();    
    axios({
      method: 'post', 
      url: `/lists/cards/${cardId}/comments`,
      data: {
        content: cardComment
      }
    })
    .then(function(response){
      console.log(response)
      if (response.status === 200) {
        let data = response.data
        $('[data-role ="comment-area"]').prepend(`
        <div class="comment-container">
          <div class="comment-header">
            <span class="author">${data.user_id}</span>
            <span class="comment-time">${data.created_at}</span>
          </div>
          <div class="comment-body">
            <p>${data.content}</p> 
          </div>
        </div>`)
      } else {
        throw 'Error'
      }
    })
    .then(function(){
      $('[data-role ="comment-input"]').val("")
    })
  });
// Card assignee
  $('.member-list').on("click",  function(evt){
    let cardId = $('[data-role ="card-focus-id"]').text()
    let userId = $(this).children('span').attr('data-memberid')
    axios({
      method: 'put',
      url: `/lists/cards/${cardId}/assign`,
      data: {
        userId: userId,
      }
    })
    .then( function(response){
      let data = response.data
      if (data.status === "ok"){
        console.log(data)
        let assignMember = data.assignee
        assignMember.map(function(assignee){
          $('.card-member').append(`<span class="assignee">${assignee.email}</span>`)
        })
      } else {
        let data = response.data
        console.log(data)
        $('.assignee').remove(`:contains(${data.email})`)
      }
    })
  })
// Add tags  
  $('.tag-item').on('click', '#add-tag', function(){
    console.log('Add tags');
    let cardId = $('[data-role="card-focus-id"]').text()
    let cardTags = $(this).siblings("div").text()
    let tagColour = $(this).siblings("div").css('background-color')
    console.log(tagColour)
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
        console.log(data)
        data.forEach(function(tag){
          $('.tag-list').append(`<span style="background-color:${tagColour}">${tag.name}</span>`)
        })
      } 
    })
  })
// Date Picker
  $('.datepicker').click(function(){
    $(this).datepicker();
  })
/////////////////////////////////////////////
})