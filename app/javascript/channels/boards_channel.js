import consumer from "./consumer"

$( document ).on('turbolinks:load', function() {
    $(function(env){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]

        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: board_id},
          {received: function(data) {
            let list_template = $("template#list-template").html()
            let template = $(list_template).clone()
            template.find("p#list-title").text(data.title)
            $("#list-card-group").append(template)
          }
        }  
      )
    })
})


