import consumer from "./consumer"
import list_create from "./template/list_create"
import card_create from "./template/card_create"

$( document ).on('turbolinks:load', function() {
    $(function(event){
        let board_url = location.pathname.split('/')
        let board_id =  board_url[board_url.length - 1]
        consumer.subscriptions.create(
          {channel: "BoardsChannel",board: board_id},
          {received: function(data) {
            let status = data.status
            switch (status){
              case "list_create":
                let list_template = $(list_create).html()
                let list_channel = $(list_template).clone(true,true)
                list_channel.find('[data-role="list-wrapper"]').attr("id", `list_${data.id}`)
                list_channel.find('[data-role="list-title"]').text(data.title)
                list_channel.find('[data-role="list-id"]').attr("val", `${data.id}`)
                $("#js-list-sortable").append(list_channel)
                break;
              case "card_create":
                let card_channel = $(card_create).clone(true,  true)
                card_channel.find('[data-role="card-id"]').attr("val", `${data.id}`)
                card_channel.find('[data-role="sortable-column"]').attr("id", `${data.id}`)
                card_channel.find('[data-role="card-title"]').text(data.title)
                let card_template = $(card_channel).html()
                $(`input[val=${data.list_id}]`).parents('[data-role= "list-item"]')
                                                                              .siblings('[data-role="card-wrapper"]')
                                                                              .find('[data-role="card-group"]')
                                                                              .append(card_template)
                break;
              case "card_add_prev":
                console.log(data)
                let card_sort_channel_prev = $(card_create).clone(true,  true)
                card_sort_channel_prev.find('[data-role="card-id"]').attr("val", `${data.card_id.id}`)
                card_sort_channel_prev.find('[data-role="sortable-column"]').attr("id", `${data.card_id.id}`)
                card_sort_channel_prev.find('[data-role="card-title"]').text(data.card_id.title)
                let card_sort_template_prev = $(card_sort_channel_prev).html()
                $(`div[id=${data.card_id.id}]`).remove()
                $(`div[id=list_${data.list_id}]`).find(`div[id=${data.next_id}]`).before(card_sort_template_prev)
                break;
              case "card_add_next":
                let card_sort_channel_next = $(card_create).clone(true,  true)
                card_sort_channel_next.find('[data-role="card-id"]').attr("val", `${data.card_id.id}`)
                card_sort_channel_next.find('[data-role="sortable-column"]').attr("id", `${data.card_id.id}`)
                card_sort_channel_next.find('[data-role="card-title"]').text(data.card_id.title)
                let card_sort_template_next = $(card_sort_channel_next).html()
                $(`div[id=${data.card_id.id}]`).remove()
                $(`div[id=list_${data.list_id}]`).find(`div[id=${data.prev_id}]`).after(card_sort_template_next)
                break;
              case "card_add":
                let card_sort_channel_add = $(card_create).clone(true,  true)
                card_sort_channel_add.find('[data-role="card-id"]').attr("val", `${data.card_id.id}`)
                card_sort_channel_add.find('[data-role="sortable-column"]').attr("id", `${data.card_id.id}`)
                card_sort_channel_add.find('[data-role="card-title"]').text(data.card_id.title)
                let card_sort_template_add = $(card_sort_channel_add).html()
                $(`div[id=${data.card_id.id}]`).remove()
                $(`div[id=list_${data.list_id}]`).find('[data-role="sort-able hidden"]').after(card_sort_template_add)
                break;
            }
          }
        }  
      )
    })
})


