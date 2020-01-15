$(document).ready( function() {
  $(".parentDiv").on("click", function(event){
    let listHasClassDiv = $(event.target).hasClass("list-add-top")
    let listHasClassSpan = $(event.target).hasClass("list-add-span")
    let listHasClassI = $(event.target).hasClass("list-add-i")

    if ( listHasClassDiv || listHasClassSpan || listHasClassI ){
      $(".list-add-form").toggle(function(){
        $(".form-inp").focus()  
      })
      $(".list-add-top").hide()
    } else if ($(event.target).parents().hasClass("list-wrapper")){
      $(".form-inp").focus()
    } else {
      $(event.target).show("slow",function(){
        $("#js-list-content-btn").show()
        $(".list-add-form").hide()
      })
    }
  })
  
  $(".parentDiv").on("click", function(){
    let eventTarget = $(event.target)
    let cardHasClass = $(event.target).hasClass("card-create-span")
    let cardHasClassI = $(event.target).hasClass("card-add-i")
    console.log(cardHasClassI)
    let cardTargetClassBtn = $(event.target).hasClass("card-create btn")
    let cardTargetClassArea = $(event.target).hasClass("card-create-area")
    let cardTargetClassBtnArea = $(event.target).hasClass("card-add btn btn-success")
    if ( cardHasClass || cardHasClassI ) {
      $(".card-input-controller").hide(function(){
        $(".card-create-drop").show()
        eventTarget.parents(".card-wrapper").find(".card-create-drop").hide()
      })
      eventTarget.parents(".card-wrapper").find(".card-input-controller").toggle()
      eventTarget.parents(".card-wrapper").find(".card-create-area").focus()
    } else if ( cardTargetClassBtn || cardTargetClassArea || cardTargetClassBtnArea){
      console.log("tyhujik")
      eventTarget.parents(".card-wrapper").find(".card-create-area").focus()
    } else {
      $(".card-input-controller").hide()
      $(".card-create-drop").show()
    }
  })
  $("#invite-create-btn").on("click", function(){
    $("#dropdownMenu2").dropdown('toggle')
    $("#dropdownMenu2_email").val("")
    $("#dropdownMenu2_message").val("")
  })
})
