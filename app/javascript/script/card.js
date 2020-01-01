import axios from 'helpers/axios';

$(document).on("turbolinks:load", function(){
//card_create
    $('[data-role="card-create-btn"]').click(function(){
      const board_url = location.pathname.split('/')
      const board_id =  board_url[board_url.length - 1]
      let list_id = $(this).parents("#card-wrapper").siblings("#list-item").find("#list-id").attr("val")
      let card_text = $(this).parents("#card-btn").siblings("#card-input").find("textarea").val()
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
    });
//
  $('[data-role="btn card-name"]').click(function(event){
    console.log("已觸發")
    let card_id = $(this).children("span").text().replace(/\s+/g,"");
    axios({
      method: 'get',
      url: `/lists/cards/${card_id}`,
    })
    .then(function (response) {
      console.log(response)
      console.log(response.data)
      let card_item = response.data
      console.log(card_item)
      $('[data-role = "card-focus-id"]').text(`${card_item.id}`)
      $('[data-role = "card-title"]').text(`${card_item.title}`)
      $('[data-role = "card-description"]').val(`${card_item.description}`)
      $('[data-role="card-due-date"]').val(`${card_item.due_date}`)
      $('[data-role="card-archived"]').val(`${card_item.archived}`)
      $('[data-role="card-tags"]').val(`${card_item.tags}`)
    })
  });
//
  $('[data-role="card-update"]').click(function(){
    console.log("已觸發")
    let card_id = $('[data-role = "card-focus-id"]').text()
    let card_description = $('[data-role = "card-description"]').val()
    let card_due_date = $('[data-role="card-due-date"]').val()
    let card_archived = $('[data-role="card-archived"]').val()
    let card_tags = $('[data-role="card-tags"]').val()
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

  })
/////////////////////////////////////////////
})