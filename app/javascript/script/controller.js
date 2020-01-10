$(document).ready( function() {
  $(".parentDiv").on("click", function(event){
    if($(event.target).hasClass("list-add-top")){
        $(".list-add-form").toggle()
          $(event.target).hide()
      }else{
        $(event.target).show("slow",function(){
          $("#js-list-content-btn").show()
          $(".list-add-form").hide()
        })
    }
  })
  //
})