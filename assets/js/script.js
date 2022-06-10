// welcome modal upon page load
$(document).ready(function () {
  $('#welcomeModal').modal();
  $('#welcomeModal').modal('open');
  $('select').formSelect();
  $('.sidenav').sidenav();
});
// setting variables
var TypeEl;
var CostEl;
var free = false;
var ParticipantsEl;
var AccessibilityEl;
var accessibility = false;
var favorites = [];
var returnedActivity;
var returnedType;
var returnedParticipants;
var dollarSign;
var easeOfAccess;

var favoriteButton = $('#favoriteButton');

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

  // if no parameters are used, set boredURL to random URL
  if (!TypeEl && !free && !ParticipantsEl && !accessibility) {
    boredURL = 'http://www.boredapi.com/api/activity/'
  } else if (TypeEl || free || ParticipantsEl || accessibility) {
    boredURL = 'http://www.boredapi.com/api/activity?'
    // if a type was provided, add query parameter to URL
    if (TypeEl) {boredURL = boredURL + '&type=' + TypeEl};
    // if preference for activity to be free, add query parameter 
    if (free) {boredURL = boredURL + '&price=0'};
    // if participants are specified
    if (ParticipantsEl) {boredURL = boredURL + '&participants=' + ParticipantsEl};
    // if accessibility is needed
    if (accessibility) {boredURL = boredURL + '&minaccessibility=0.1'};
  }

  $('#preferenceForm')[0].reset();

  // call function below
  getApi();
  // creating function to fetch from BoredAPI
  function getApi() {
    fetch(boredURL)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (data) {
        // if statement to determine validity of parameters
        if (data.error == "No activity found with the specified parameters") {
          $('#errorModal').modal();
          $('#errorModal').modal('open');
          $('select').formSelect();
        } else {
          // retrieve boredAPI data
          returnedActivity = data.activity;
          returnedType = data.type;
          returnedType = returnedType.charAt(0).toUpperCase() + returnedType.slice(1);
          returnedParticipants = data.participants;
          var returnedPrice = data.price;
          var returnedAccessibility = data.accessibility;

          // if statement to display a value symbol instead of the 0-1 range
          if (returnedPrice < 0.3 && returnedPrice > 0) {
            dollarSign = "$"
          } else if (returnedPrice >= 0.3 && returnedPrice < 0.6) {
            dollarSign = "$$"
          } else if (returnedPrice >= 0.6 && returnedPrice <= 0.9) {
            dollarSign = "$$$"
          } else {
            dollarSign = "Free"
          };
          // if statement to display level of difficulty in words instead of 0-1 range
          if (returnedAccessibility >= 0 && returnedAccessibility < 0.4) {
            easeOfAccess = "Difficult"
          } else if (returnedAccessibility >= 0.4 && returnedAccessibility < 0.8) {
            easeOfAccess = "Moderate"
          } else {
            easeOfAccess = "Easy peasy"
          };

          // Code to display input query results in "Here..." box
          var activityHeader = document.getElementById("resultheader")
          var viewActivity = document.getElementById("activityview")
          var viewType = document.getElementById("typeview")
          var viewPrice = document.getElementById("priceview")
          var viewPart = document.getElementById("participantsview")
          var viewAccess = document.getElementById("accessview")

          // putting text content to display returned data based on parameters
          activityHeader.textContent = "Here is your activity!"
          viewActivity.textContent = returnedActivity;
          viewType.textContent = "Type: " + returnedType;
          viewPrice.textContent = "Price: " + dollarSign;
          viewPart.textContent = "Participants: " + returnedParticipants;
          viewAccess.textContent = "Accessibility: " + easeOfAccess;

          // show favorite button          
          favoriteButton.show();
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
              console.log(data.query.search);

              var wikiHeader = document.getElementById('wikiHeader')
              wikiHeader.attr = 'class', 'resultTitle white-text'
              wikiHeader.textContent = "Wiki Search Results"
              
              if ($('.wikiResults').children()) {
              $('.wikiResults').empty()
              }

              // retrieving 3 relevant wiki results and their info
              for (let i = 0; i < 3; i++) {
                let resultsEl = results[i];
                let resultsPageID = results[i].pageid;
                let pageURL = 'https://en.wikipedia.org/?curid=' + resultsPageID;
                console.log(pageURL);
                var title = resultsEl.title;
                var snippet = resultsEl.snippet;
                // remove extra HTML from snippets
                snippet = snippet.replaceAll('<span class="searchmatch">', '');
                snippet = snippet.replaceAll('</span>', '')
                snippet = snippet.replaceAll('&quot', '')
                console.log(title, snippet)

                function wikiEntry() {
                  // create elements and add text
                  let wikiEl = document.createElement('div');
                  wikiEl.setAttribute('class', 'card grey darken-1 card-content white-text');
                  let wikiCard = document.createElement('div');
                  wikiCard.setAttribute('class', 'card-content white-text');
                  let wikiTitle = document.createElement('h5');
                  wikiTitle.textContent = `${title}`;
                  let wikiSnippet = document.createElement('p');
                  wikiSnippet.textContent = `Description: ${snippet}` + '... ';
                  let linkToPage = document.createElement('a');
                  linkToPage.textContent = 'Read More';
                  linkToPage.setAttribute('href', pageURL);
                  linkToPage.setAttribute('target', '_blank');

                  // append to page
                  wikiCard.append(wikiTitle);
                  wikiCard.append(wikiSnippet);
                  wikiSnippet.append(linkToPage);
                  wikiEl.append(wikiCard);
                  document.querySelector('.wikiResults').append(wikiEl);
                  console.log(wikiEl);
                }
                wikiEntry();
              }
            })
        }
        // don't want fx to run based on the follow response from our function
        if (data.error != "No activity found with the specified parameters"){
          getWiki();
        }
      })
  }
})

// save favorites
function saveFavorite (object) {
  favorites = [];
  var storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (storedFavorites !== null) {
    favorites = storedFavorites;
  }
  favorites.push(object);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// add event listener for button
favoriteButton.on("click", function (event) {
  event.preventDefault();
  favoriteButton.hide();

  var favoriteActivity = {
    activity: returnedActivity,
    type: returnedType,
    price: dollarSign,
    participants: returnedParticipants,
    accessibility: easeOfAccess
  }
            
  console.log(favoriteActivity)

  saveFavorite(favoriteActivity);

  // show 'added to faves'
  var notify = $('#notifyfave');
  notify.css('display', 'block');
  setTimeout(function(){
    notify.css('display', 'none')
    }, 2000)
})