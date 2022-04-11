// welcome modal upon page load
$(document).ready(function(){
    $('#welcomeModal').modal();
    $('#welcomeModal').modal('open');
  });

  $('.getstarted').on("click", function () {
      console.log('clicked Get Started')
  })

//   click event for find an activity
  $('#findactivity').on("click", function () {
      console.log("clicked Find Activity")
      
  })