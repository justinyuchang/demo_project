import consumer from "./consumer"
import list_create from "./template/create.js"

$( document ).on('turbolinks:load', function() {
    $(function(env){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        console.log(board_id)
        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: board_id},
          {received: function(data) {
            //
            let list_template = $(list_create).html()
            let list_channel = $(list_template).clone(true,true)
            console.log(data)
            list_channel.find(`[data-role="list-title"]`).text(data.title)
            $('[data-role="input-local"]').before(list_channel)
            //
          }
        }  
      )
    })
})


