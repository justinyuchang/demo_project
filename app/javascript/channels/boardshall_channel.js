import consumer from "./consumer"

$( document ).ready( function() {
  $(function(event){
    consumer.subscriptions.create(
      {channel: "BoardshallChannel"},
      {received: function(data) {
        console.log(data)
      } 
    })
  })
})


