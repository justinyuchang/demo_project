import consumer from "./consumer"

$( document ).on('turbolinks:load', function() {
    $(function(env){
        let room_url = location.pathname.split('/')
        let room_id =  room_url[room_url.length - 1]

        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: room_id},
          {received: function(data) {
            console.log(data)
            let lists = $('[data-role="cart-clone"]').clone(true, true)
            lists.find('[data-role="cart-title"]').text(data.title)
            $('[data-role="lists-create"]').before(lists)

            // $element.animate({ scrollTop: $element.prop("scrollHeight")}, 1000) 
          }
        }  
      )
    })
})


