// welcome modal upon page load
$(document).ready(function(){
  $('#welcomeModal').modal();
  $('#welcomeModal').modal('open');
  $('select').formSelect();
});

//   click event for find an activity
$('#findactivity').on("click", function (event) {
  event.preventDefault();
    console.log("clicked Find Activity")
    
})