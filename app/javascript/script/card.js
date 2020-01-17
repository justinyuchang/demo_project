import axios from 'helpers/axios';
import 'flatpickr/dist/flatpickr.min.css'
import flatpickr from 'flatpickr'

$(document).ready(function () {
  // Card create 
  $('[data-role="js-list"]').on("click", '[data-role="card-create-btn"]', function (event) {
    let board_url = location.pathname.split('/')
    let board_id = board_url[board_url.length - 1]
    let list_id = $(this).parents('[data-role="card-wrapper"]')
      .siblings('[data-role= "list-item"]')
      .find('[data-role="list-id"]')
      .attr("val")
    let card_text = $(this).parents('[data-role="card-btn"]')
      .siblings('[data-role="card-input"]')
      .find("textarea")
      .val()
    axios({
      method: 'post',
      url: '/lists/cards',
      data: {
        board_id: board_id,
        card: {
          title: card_text,
          list_id: list_id,
        }
      }
    })
      .then(function (response) {
        if (response.status == 200) {
          $("textarea").val(" ")
        }
      })
  });
  // Get card 
  $('[data-role="js-list"]').on("click", '[data-role="card-title"]', function (event) {
    event.preventDefault();
    let cardId = $(this).siblings('[data-role="card-id"]').attr('val');
    axios({
      method: 'get',
      url: `/lists/cards/${cardId}`,
    })
      .then(function (response) {
        let cardData = response.data
        let cardTags = cardData.tag
        let cardComment = cardData.comments
        let cardAssignee = cardData.card_member
        $('[data-role ="comment-input"]').val("")
        $('[data-role ="card-focus-id"]').text(`${cardData.id}`)
        $('[data-role ="card-inner_title"]').text(`${cardData.title}`)
        if (cardData.description == null) {
          $('[data-role ="card-description"]').val("");
        } else {
          $('[data-role ="card-description"]').text(`${cardData.description}`)
        }
        if (cardData.due_date == null) {
          $('.picked-date').val("")
          $('.picked-date').hide()
        } else {
          let format_date = flatpickr.formatDate(new Date(cardData.due_date), "Y-m-d")
          $('.picked-date').text(`${format_date}`)
        }

        let result = ''
        cardComment.forEach(function (comment) {
          result = `<div class="comment-container"> 
        <div class="comment-header">
          <span class="author">${comment.author}</span>
          <span class="comment-time">${comment.created_at}</span>
        </div>  
        <div class="comment-body">
          <p>${comment.content}</p>
        </div>
      </div>` + result
        })
        $('[data-role ="comment-area"]').html(result);

        if (cardTags.length == 0) {
          $(".p-tag-list").hide()
          $('.tag-list').html("");
        } else {
          let tagList = ''
          cardTags.forEach(function (tag) {
            tagList = tagList + `<span style="background-color:${tag.color}" class="tags">${tag.name}</span>`
          })
          $(".p-tag-list").show()
          $('.tag-list').html(tagList);
        }

        if (cardAssignee == 0) {
          $(".p-card-member").hide()
          $('.card-member').html("");
        } else {
          let cardMember = ''
          cardAssignee.forEach(function (assignee) {
            cardMember = cardMember + `<span class="assignee">${assignee}</span>`
          })
          $(".p-card-member").show()
          $('.card-member').html(cardMember);
        }

        $('#Carditem').modal('show')
      })
  });
  // Update card 
  $('[data-role="card-update"]').click(function () {
    let cardId = $('[data-role ="card-focus-id"]').text()
    let cardTitle = $('[data-role ="card-inner_title"]').text()
    let carDescription = $('[data-role ="card-description"]').text()
    axios({
      method: 'patch',
      url: `/lists/cards/${cardId}`,
      data: {
        title: cardTitle,
        description: carDescription,
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          $('#Carditem').modal('hide')
        }
      })
  });
  // Send Comment
  $('[data-role ="comment-send"]').click(function () {
    let cardId = $('[data-role ="card-focus-id"]').text()
    let cardComment = $(this).siblings("textarea").val();
    axios({
      method: 'post',
      url: `/lists/cards/${cardId}/comments`,
      data: {
        content: cardComment
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          let data = response.data
          $('[data-role ="comment-area"]').prepend(`
        <div class="comment-container">
          <div class="comment-header">
            <span class="author">${data.author}</span>
            <span class="comment-time">${data.created_at}</span>
          </div>
          <div class="comment-body">
            <p>${data.content}</p> 
          </div>
        </div>`)
        } else {
          throw 'Error'
        }
      })
      .then(function () {
        $('[data-role ="comment-input"]').val("")
      })
  });
  // Card assignee
  $('.member-list').on("click", function (evt) {
    let cardId = $('[data-role ="card-focus-id"]').text()
    let userId = $(this).children('span').attr('data-memberid')
    axios({
      method: 'put',
      url: `/lists/cards/${cardId}/assign`,
      data: {
        userId: userId,
      }
    })
      .then(function (response) {
        let data = response.data
        if (data.status === "ok") {
          $('.card-member').show()
          let assignMember = data.assignee
          for (let memberTag = 0; memberTag < assignMember.length; memberTag++) {
            $(".p-card-member").show()
            $('.card-member').append(`<span class="assignee">${assignMember[memberTag].username}</span>`)
          }

        } else {
          let data = response.data
          $('.assignee').remove(`:contains(${data.username})`)
          if ($('.assignee').length === 0) {
            $(".p-card-member").hide()
            $('.card-member').hide()
          }
        }
      })
  })
  // Add tags  
  $('.tag-item').on('click', '#add-tag', function () {
    let cardId = $('[data-role="card-focus-id"]').text()
    let cardTags = $(this).siblings("div").text()
    let tagColor = $(this).siblings("div").css('background-color')
    axios({
      method: 'put',
      url: `/lists/cards/${cardId}/tagging`,
      data: {
        cardTags: cardTags,
        tagColor: tagColor
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          let data = response.data
          data.forEach(function (tag) {
            $(".p-tag-list").show()
            $('.tag-list').append(`<span style="background-color:${tagColor}" class="tags">${tag.name}</span>`)
          })
        }
      })
  })
  // Shows datepickr   
  flatpickr('.date-input', {
    onChange: function (selectedDates, dateStr, instance) {
      let cardId = $('[data-role ="card-focus-id"]').text()
      axios({
        method: 'patch',
        url: `/lists/cards/${cardId}`,
        data: {
          due_date: dateStr,
        }
      })
        .then(function (response) {
          let data = response.data
          $('.picked-date').text(`${data.due_date}`)
          $('.picked-date').show()
        })
    },
    inline: true,
    minDate: "today",
    dateFormat: "Y-m-d",
  })
})