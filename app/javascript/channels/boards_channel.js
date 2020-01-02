import consumer from "./consumer"
import list_create from "./template/list_create"
import card_create from "./template/card_create"

$( document ).on('turbolinks:load', function() {
    $(function(env){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: board_id},
          {received: function(data) {
            //
            let stats =data.stats
            console.log(data)
            if(stats == "list_create"){
              let list_template = $(list_create).html()
              let list_channel = $(list_template).clone(true,true)
              list_channel.find('[data-role="list-title"]').text(data.title)
              list_channel.find('[data-role="list-id"]').attr("val", `${data.id}`)
              $('[data-role="input-local"]').before(list_channel)
            }else{
              let card_template = $(card_create).html()
              let card_channel = $(card_template).clone(true,true)
              card_channel.find('[data-role="card-id"]').attr("val", `${data.id}`)
              card_channel.find('[data-role="card-title"]').text(data.title)
              $(`input[val=${data.list_id}]`).parents('[data-role= "list-item"]')
                                                                            .siblings('[data-role="card-wrapper"]')
                                                                            .find('[data-role="card-group"]')
                                                                            .append(card_channel)

            }

            //
          }
        }  
      )
    })
})


