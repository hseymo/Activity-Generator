// welcome modal upon page load
$(document).ready(function(){
  $('#welcomeModal').modal();
  $('#welcomeModal').modal('open');
  $('select').formSelect();
});


  let getActivity = "http://www.boredapi.com/api/activity/"

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
  if (CostEl == 0.0) {
    free = true;
  } else {
    free = false;
  };
  ParticipantsEl = $('#participants').val();
  AccessibilityEl = $('#accessibility').val();
  if (AccessibilityEl == 1) {
    accessibility = true;
  } else {
    accessibility = false;
  }
  console.log(TypeEl, free, ParticipantsEl, accessibility);
  createURL();


function createURL() {
  var boredURL;
  // if no parameters are used, set boredURL to random URL
  if (!TypeEl && !free && !ParticipantsEl && !accessibility) {
    boredURL = 'http://www.boredapi.com/api/activity/'
  // if any parameters are provided, set base URL and construct with each parameter
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
      .then (function(data) {
        console.log(data)
        // retrieve boredAPI data
        var returnedActivity = data.activity;
        var returnedType = data.type;
        var returnedParticipants = data.participants;
        var returnedPrice = data.price;
        var returnedAccessibility = data.accessibility;
        var returnedLink = data.link;
        // console.log(returnedActivity,returnedType,returnedParticipants,returnedPrice,returnedAccessibility,returnedLink)

        // TODO: POST ACTIVITY DATA TO PAGE

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
            .then (function(data) {
              var resultsLink = data.link;
              console.log(resultsLink);
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
}
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
