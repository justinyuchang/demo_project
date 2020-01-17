import consumer from "./consumer"
import invite_create from "./template/invite.create"

$(document).ready(function () {
  $(function (event) {
    consumer.subscriptions.create(
      { channel: "BoardshallChannel" },
      {
        received: function (data) {
          let invite_channel = $(invite_create).clone()
          invite_channel.find(".toast.fade.show").attr("id", `invite_${data.id}`)
          invite_channel.find(".js-invited-small").text(data.created_at)
          invite_channel.find(".invitation-message").text(data.message)
          invite_channel.find(".btn-info").attr("href", `/boards/agree_invite?agree=true&amp;board_id=${data.board_id}&amp;id=${data.id}`)
          invite_channel.find(".btn-dark").attr("href", `/boards/agree_invite?agree=false&amp;board_id=${data.board_id}&amp;id=${data.id}`)
          let invite_template = $(invite_channel).html()
          $(".invite-create-group").append(invite_template)
        }
      })
  })
})


