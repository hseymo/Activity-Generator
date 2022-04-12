// welcome modal upon page load
$(document).ready(function () {
  $('#welcomeModal').modal();
  $('#welcomeModal').modal('open');
  $('select').formSelect();
});
<<<<<<< HEAD
// setting variables
=======


  let getActivity = "http://www.boredapi.com/api/activity/"

>>>>>>> dev
var TypeEl;
var CostEl;
var free = false;
var ParticipantsEl;
var AccessibilityEl;
var accessibility = false;

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
// pull data from form submission and save as variables
TypeEl = $('#type').val();
CostEl = $('#price').val();
// setting "free" display conditions
if (CostEl == 0.0) {
  free = true;
} else {
  free = false;
};
// fetching the value for the number ranges of participants and accessibility parameters
ParticipantsEl = $('#participants').val();
AccessibilityEl = $('#accessibility').val();
if (AccessibilityEl == 1) {
  accessibility = true;
} else {
  accessibility = false;
}
console.log(TypeEl, free, ParticipantsEl, accessibility);
// if no parameters are used, set boredURL to random URL
if (!TypeEl && !free && !ParticipantsEl && !accessibility) {
  boredURL = 'http://www.boredapi.com/api/activity/'
} else if (TypeEl || free || ParticipantsEl || accessibility) {
  boredURL = 'http://www.boredapi.com/api/activity?'
  // if a type was provided, add query parameter to URL
  if (TypeEl) {
    boredURL = boredURL + '&type=' + TypeEl;
  };
  // if preference for activity to be free, add query parameter 
  if (free) {
    boredURL = boredURL + '&price=0';
  };
  // if participants are specified
  if (ParticipantsEl) {
    boredURL = boredURL + '&participants=' + ParticipantsEl
  };
  // if accessibility is needed
  if (accessibility) {
    boredURL = boredURL + '&minaccessibility=0.1';
  }

}
console.log(boredURL)
getApi();

function getApi() {
  fetch(boredURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data.error)
      // if statement to determine validity of parameters
      if (data.error == "No activity found with the specified parameters") {
        $('#errorModal').modal();
        $('#errorModal').modal('open');
        $('select').formSelect();
      } else {
        // retrieve boredAPI data
        var returnedActivity = data.activity;
        var returnedType = data.type;
        var returnedParticipants = data.participants;
        var returnedPrice = data.price;
        var returnedAccessibility = data.accessibility;
        var returnedLink = data.link;
        console.log(returnedActivity, returnedType, returnedParticipants, returnedPrice, returnedAccessibility, returnedLink)

        // Code to display input query results in "Here..." box
        var viewActivity = document.getElementById("activityview")
        var viewType = document.getElementById("typeview")
        var viewPrice = document.getElementById("priceview")
        var viewPart = document.getElementById("participantsview")
        var viewAccess = document.getElementById("accessview")
        var dollarSign;
        // if statement to display a value symbol instead of the 0-1 range
        if (returnedPrice < 0.3 && returnedPrice > 0) {
          dollarSign = "$"
        } else if (returnedPrice >= 0.3 && returnedPrice < 0.6) {
          dollarSign = "$$"
        } else if (returnedPrice >= 0.6 && returnedPrice <= 0.9) {
          dollarSign = "$$$"
        } else {
          dollarSign = "Free"
        }
        // if statement to display level of difficulty in words instead of 0-1 range
        var easeOfAccess;
        if (returnedAccessibility >= 0 && returnedAccessibility < 0.4) {
          easeOfAccess = "Difficult"
        } else if (returnedAccessibility >= 0.4 && returnedAccessibility < 0.8) {
          easeOfAccess = "Moderate"
        } else {
          easeOfAccess = "Easy peasy"
        }
        // putting text content to display returned data based on parameters
        viewActivity.textContent = "Activity: " + returnedActivity;
        viewType.textContent = "Type: " + returnedType;
        viewPrice.textContent = "Price: " + dollarSign;
        viewPart.textContent = "Participants: " + returnedParticipants;
        viewAccess.textContent = "Accessibility: " + easeOfAccess;
      }
      // retrieve wiki data
      var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + returnedActivity + '&utf8=&format=json&origin=*'
      function getWiki() {
        fetch(wikiURL)
          .then(function (response) {
            if (!response.ok) {
              throw response.json();
            }
            return response.json();
          })
          .then(function (data) {
            var results = data.query.search;
            console.log(results);
            // retrieving 10 relevant wiki results
            for (let i = 0; i < results.length; i++) {
              let resultsEl = results[i];
              console.log(resultsEl);
              var title = resultsEl.title;
              var snippet = resultsEl.snippet;
              // remove extra HTML from snippets
              snippet = snippet.replaceAll('<span class="searchmatch">', '');
              snippet = snippet.replaceAll('</span>', '')
              // TODO: parse for wiki link! 
              console.log(title, snippet)
              let wikiResults = document.getElementById('wikiResultsCard')
              let resultCard = document.createElement('div');
              resultCard.classList = 'card-panel';

              // let resultCardContent = `
              // <nav id="wikiResultsCard" class="card-panel white">
              //   <ul id="wikiResultList" class="black-text m3">
              //       <li class="h"> Title: ${title} </li>
              //       <li class="truncate"> Description: ${snippet} </li>
              //   </ul>
              // </nav>
              // `
              let resultCardContent = ` 
                <div class="row">
                <div class="col s12 m6">
                  <div class="card grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">${title}</span>
                      <p>Description: ${snippet}</p>
                    </div>
                    <div class="card-action">
                      <a href="#">Click to learn more</a>
                    </div>
                  </div>
                </div>
              </div>
                        
                `
              wikiResults.innerHTML += resultCardContent;
            }

            // TODO: Post wiki results to page! (Create card for each one?)
            console.log(results.length);
            //    $('#wikiResultList').append('<li>' + 'Title: ' + results[i].title + '</li>' + '<br></br>');
            //    $('#wikiResultList').append('<li>' + 'Snippet: ' + results[i].snippet + '</li>' + '<br></br>');


          })
      }
      getWiki();
    })


}
