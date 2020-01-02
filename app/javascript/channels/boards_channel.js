import consumer from "./consumer"
import list_create from "./template/create"

$( document ).on('turbolinks:load', function() {
    $(function(env){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: board_id},
          {received: function(data) {
            //
            console.log(data)
            let list_template = $(list_create).html()
            let list_channel = $(list_template).clone(true,true)
            list_channel.find('[data-role="list-title"]').text(data.title)
            list_channel.find('[data-role="list-id"]').attr("val", `${data.id}`)
            $('[data-role="input-local"]').before(list_channel)
            //
          }
        }  
      )
    })
})


