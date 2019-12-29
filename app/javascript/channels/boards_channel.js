import consumer from "./consumer"

$( document ).on('turbolinks:load', function() {
    $(function(env){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]

        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: board_id},
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


