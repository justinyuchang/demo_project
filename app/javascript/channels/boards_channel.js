import consumer from "./consumer"
import list_create from "./template/list_create"
import card_create from "./template/card_create"

$( document ).on('turbolinks:load', function() {
    $(function(event){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: board_id},
          {received: function(data) {
            let status = data.status
            console.log(data)
            switch (status){
              case "list_create":
                let list_template = $(list_create).html()
                let list_channel = $(list_template).clone(true,true)
                list_channel.find('[data-role="list-wrapper"]').attr("id", `list_${data.id}`)
                list_channel.find('[data-role="list-title"]').text(data.title)
                list_channel.find('[data-role="list-id"]').attr("val", `${data.id}`)
                $('[data-role="input-local"]').before(list_channel)
                break;
              case "card_create":
                let card_channel = $(card_create).clone(true,  true)
                card_channel.find('[data-role="card-id"]').attr("val", `${data.id}`)
                card_channel.find('[data-role="sortable-column"]').attr("id", `${data.id}`)
                card_channel.find('[data-role="card-title"]').text(data.title)
                let card_template = $(card_channel).html()
                $(`input[val=${data.list_id}]`).parents('[data-role= "list-item"]')
                                                                              .siblings('[data-role="card-wrapper"]')
                                                                              .find('[data-role="card-group"]')
                                                                              .append(card_template)
                  break;
                case "sortable_delete":
                  console.log(data)
                  $(`div[id=list_${data.list_id}]`).find(`div[id=${data.card_id}]`).remove()
                  
                  break;
            }
          }
        }  
      )
    })
})


