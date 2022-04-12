// welcome modal upon page load
$(document).ready(function(){
  $('#welcomeModal').modal();
  $('#welcomeModal').modal('open');
  $('select').formSelect();
});

var TypeEl;
var CostEl;
var free;
var ParticipantsEl;
var AccessibilityEl;
var accessibility;


//   click event for find an activity
$('#findactivity').on("click", function (event) {
  event.preventDefault();
    TypeEl = $('#type').val();
    console.log(TypeEl);
    CostEl = $('#price').val();
    console.log(CostEl);
    if (CostEl == 0.0) {
      free = true;
    } else {
      free = false;
    };
    console.log(free)
    ParticipantsEl = $('#participants').val();
    console.log(ParticipantsEl);
    AccessibilityEl = $('#accessibility').val();
    if (AccessibilityEl == 1) {
      accessibility = true;
    } else {
      accessibility = false;
    }
    console.log(AccessibilityEl);
    console.log(accessibility);
    // Code to display input query results in "Here" box
    // var viewType = document.getElementById("typeview")
    // var viewPrice = document.getElementById("priceview")
    // var viewPart = document.getElementById("participantsview")
    // var viewAccess = document.getElementById("accessview")
    // Fill in stringify() with result fetch
    // viewType.append(JSON.stringify())
    // viewPrice.append(JSON.stringify())
    // viewPart.append(JSON.stringify())
    // viewAccess.append(JSON.stringify())
})