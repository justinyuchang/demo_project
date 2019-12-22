import consumer from "./consumer"

$( document ).on('turbolinks:load', function() {
    $(function(){

        consumer.subscriptions.create(
          {channel: "BoardsChannel"},
          {received: function(data) {
            console.log("大廳")
          }
        }  
      )
    })
})


