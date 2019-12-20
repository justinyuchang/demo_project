import consumer from "./consumer"

$( document ).on('turbolinks:load', function() {
    $(function(){
        let room_id =$("#1").data("id")
        let $element = $('[data-role = "message"]');
        let messageTemplate = $('[data-role = "message-template"]');

        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: room_id},
          {received: function(data) {
            let content = messageTemplate.children().clone(true, true);
            content.find('[data-role = "message-p"]').text(data.message);
            content.find('[data-role = "message-em"]').text(data.user_id);
            $element.append(content);
            // $element.animate({ scrollTop: $element.prop("scrollHeight")}, 1000) 
          }
        }  
      )
    })
})


