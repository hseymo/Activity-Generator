// welcome modal upon page load
$(document).ready(function () {
  $('#welcomeModal').modal();
  $('#welcomeModal').modal('open');
  $('select').formSelect();
});
// setting variables
var TypeEl;
var CostEl;
var free = false;
var ParticipantsEl;
var AccessibilityEl;
var accessibility = false;
var favorites = [];

//   click event for find an activity
$('#findactivity').on("click", function (event) {
  event.preventDefault();

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
          // retrieve boredAPI data
          var returnedActivity = data.activity;
          var returnedType = data.type;
          returnedType = returnedType.charAt(0).toUpperCase() + returnedType.slice(1);
          var returnedParticipants = data.participants;
          var returnedPrice = data.price;
          var returnedAccessibility = data.accessibility;
          var returnedLink = data.link;
          console.log(returnedActivity, returnedType, returnedParticipants, returnedPrice, returnedAccessibility, returnedLink)

          // TODO: POST ACTIVITY DATA TO PAGE
          // Code to display input query results in "Here" box
          var viewActivity = document.getElementById("activityview")
          var viewType = document.getElementById("typeview")
          var viewPrice = document.getElementById("priceview")
          var viewPart = document.getElementById("participantsview")
          var viewAccess = document.getElementById("accessview")
          // Use if statement to validate and randomize
          // if (data == "error") {
          //   fetch(boredURL).then(function (response) {
          //     if (!response.ok) {
          //       throw response.json();
          //     }
          //     return response.json();
          //   })
          // } else if (data != "error") {
          var dollarSign;
          if (returnedPrice < 0.3 && returnedPrice > 0) {
            dollarSign = "$"
          } else if (returnedPrice >= 0.3 && returnedPrice < 0.6) {
            dollarSign = "$$"
          } else if (returnedPrice >= 0.6 && returnedPrice <= 0.9) {
            dollarSign = "$$$"
          } else {
            dollarSign = "Free"
          }
          var easeOfAccess;
          if (returnedAccessibility >= 0 && returnedAccessibility < 0.4) {
            easeOfAccess = "Difficult"
          } else if (returnedAccessibility >= 0.4 && returnedAccessibility < 0.8) {
            easeOfAccess = "Moderate"
          } else {
            easeOfAccess = "Easy peasy"
          }
          viewActivity.textContent = "Activity: " + returnedActivity;
          viewType.textContent = "Type: " + returnedType;
          viewPrice.textContent = "Price: " + dollarSign;
          viewPart.textContent = "Participants: " + returnedParticipants;
          viewAccess.textContent = "Accessibility: " + easeOfAccess;

          // add favorite button
          var resultCard = $('#result-card')
          var newButton = $('<button>');
          newButton.attr("type", "submit");
          newButton.addClass("grey darken-1 waves-effect waves-orange btn custom-btn");
          newButton.text("Favorite this activity");
          resultCard.append(newButton);

          // add event listener for button
          newButton.on("click", function () {
            var favoriteActivity = {
              activity: returnedActivity,
              type: returnedType,
              price: dollarSign,
              participants: returnedParticipants,
              accessibility: easeOfAccess
            }
            
            console.log(favoriteActivity)

            function saveFavorite () {
              var storedFavorites = JSON.parse(localStorage.getItem("favorites"));
              if (storedFavorites !== null) {
                favorites = storedFavorites;
              }
              favorites.push(favoriteActivity);
              localStorage.setItem("favorites", JSON.stringify(favorites));
            }
            saveFavorite();

            var favoriteSuccess = $('<p>');
            favoriteSuccess.text("Added to favorites!");
            resultCard.append(favoriteSuccess);
          })

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
              // let resultCardContent = ` 
              //   <div class="row">
              //   <div class="col s12 m6">
              //     <div class="card grey darken-1">
              //       <div class="card-content white-text">
              //         <span class="card-title">${title}</span>
              //         <p>Description: ${snippet}</p>
              //       </div>
              //       <div class="card-action">
              //         <a href="#">Click to learn more</a>
              //       </div>
              //     </div>
              //   </div>
              // </div>
                        
              //   `
              // wikiResults.innerHTML += resultCardContent;
              function wikiEntry() {
                let wikiEl = document.createElement('div');
                wikiEl.attr = 'class', 'card blue-grey darken-1 card-content white-text';
                let wikiCard = document.createElement('div');
                wikiCard.attr = 'class', 'card-content white-text';
                let wikiTitle = document.createElement('h5');
                wikiTitle.textContent = `Title: ${title}`;
                let wikiSnippet = document.createElement('p');
                wikiSnippet.textContent = `Description: ${snippet}`;

                wikiCard.append(wikiTitle);
                wikiCard.append(wikiSnippet);

                wikiEl.append(wikiCard);
                
                document.querySelector('.wikiResults').append(wikiEl);
                console.log(wikiEl);
              }

              wikiEntry();
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
})