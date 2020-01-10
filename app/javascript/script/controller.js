$(document).ready( function() {
  $(".parentDiv").on("click", function(event){
    if ($(event.target).hasClass("list-add-top")){
      $(".list-add-form").toggle(function(){
        $(".form-inp").focus()
      })
        $(event.target).hide()
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
    let cardHasClass =$(event.target).hasClass("card-create-span")
    if(cardHasClass){
      $(event.target).parents(".card-wrapper").find(".card-input-controller").toggle()
      $(event.target).parents(".card-wrapper").find(".card-create-area").focus()
    } else {
      $(".card-input-controller").hide()
    }
  })
})