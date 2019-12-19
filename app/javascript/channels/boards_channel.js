import consumer from "./consumer"

$( document ).on('turbolinks:load', function() {
    $(function(){
        let room_id =$("#1").data("id")
        console.log(room_id)
        consumer.subscriptions.create(
          {channel: "BoardsChannel",
            board: room_id},
          {received: function(data) {
            console.log("已連線")
            console.log(data)
          }
        }  
      )
    })
})


