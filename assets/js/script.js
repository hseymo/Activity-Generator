// welcome modal upon page load
$(document).ready(function(){
    $('#welcomeModal').modal();
    $('#welcomeModal').modal('open');
  });

  $('.getstarted').on("click", function () {
      console.log('clicked Get Started')
  })

  let getActivity = "http://www.boredapi.com/api/activity/"

//   click event for find an activity
  $('#findactivity').on("click", function () {
      fetch(getActivity)
      .then(function (response) {
        return response.json();
      })
  })