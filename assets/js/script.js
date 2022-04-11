// welcome modal upon page load
$(document).ready(function(){
  $('#welcomeModal').modal();
  $('#welcomeModal').modal('open');
  $('select').formSelect();
});

  let getActivity = "http://www.boredapi.com/api/activity/"

//   click event for find an activity
  $('#findactivity').on("click", function () {
      fetch(getActivity)
      .then(function (response) {
        return response.json();
      })
  })
$('#findactivity').on("click", function (event) {
  event.preventDefault();
    console.log("clicked Find Activity")
    
})
