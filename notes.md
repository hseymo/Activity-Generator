nano

HALEY 

WIKIPEDIA
  
var requestUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=fill-out-a-basketball-bracket&utf8=&format=json&origin=*'

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
      return response.json();  
      })
      .then (function(data) {
        var results = data.query.search;
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          let resultsEl = results[i];
          console.log(resultsEl)
          var title = resultsEl.title;
          var snippet = resultsEl.snippet; 
          snippet = snippet.replaceAll('<span class="searchmatch">', '');
          snippet = snippet.replaceAll('</span>', '')
          console.log(title, snippet)
        }
      })
  }
  
  getApi(requestUrl);


  BORED API 
  
  // boredapi 
  // random event = 'http://www.boredapi.com/api/activity/'
  // given type 'http://www.boredapi.com/api/activity?type=' + ${'#type'}
    // input ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
  // given # of participants 'http://www.boredapi.com/api/activity?participants=' + ${'#participants'}
    // inputs whole integer [0, n]
  // given price 'http://www.boredapi.com/api/activity?price=' + ${'#price'}
    // inputs from [0,1 ]; also max price
  // given accessibility for inclusive (accessibility=1)

  var requestURL = 'http://www.boredapi.com/api/activity/'

  // function getApi(requestUrl) {
  //   fetch(requestUrl)
  //     .then(function (response) {
  //       if (!response.ok) {
  //         throw response.json();
  //       }
  //     return response.json();  
  //     })
  //     .then (function(data) {
  //       var activity = data.activity;
  //       var price = data.price;
  //       var participants = data.participants;
  //       var type = data.type;
  //       console.log (activity, price, participants, type)
  //     })
  // }
  
  // getApi(requestUrl);