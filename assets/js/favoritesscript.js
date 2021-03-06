$(document).ready(function () {
    $('.sidenav').sidenav();
  });

var favorites = [];

// on page load
function pageLoad() {
    // download favorites
    var downloadedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (downloadedFavorites !== null) {
        favorites = downloadedFavorites;
        for (let i = favorites.length-1; i>=0; i--) {
            var thisEntry = favorites[i]
            var thisActivity = thisEntry.activity;
            var thisType = thisEntry.type;
            var thisPrice =  thisEntry.price;
            var thisPart = thisEntry.participants;
            var thisAccess = thisEntry.accessibility;
            // create card for each
            postEntry()

            function postEntry() {
                // create elements and add text
                let newEl = $('<div>');
                newEl.addClass("col s12 m12 l6");
                let newCard = $('<div>');
                newCard.addClass("card grey darken-1 card-content white-text");
                let newContent = $('<div>');
                newContent.addClass("card-content white-text");
                let newActivity = $('<h5>');
                newActivity.text('Activity: ' + thisActivity);
                let newType = $('<h6>');
                newType.text('Type: ' + thisType);
                let newPrice = $('<h6>');
                newPrice.text('Price: ' + thisPrice);
                let newPart = $('<h6>');
                newPart.text('Participants: ' + thisPart);
                let newAcc = $('<h6>');
                newAcc.text('Accessibility: ' + thisAccess);

                let newButton = $('<button>')
                newButton.addClass('delete grey darken-1 waves-effect waves-orange btn custom-btn');
                newButton.text('Delete Favorite')
            
                // append to page
                newContent.append(newActivity);
                newContent.append(newType);
                newContent.append(newPrice);
                newContent.append(newPart);
                newContent.append(newAcc);
                newContent.append(newButton);
            
                newCard.append(newContent);
                newEl.append(newCard);
                $('#cardsection').append(newEl);
            }
        }
    }

    // if there is at least 2 favorites, add button to choose random one
    if (favorites.length > 1) {
        var randomizeButton = $('#faverandomize');
        randomizeButton.css('display', 'block');
        console.log('yes')

        randomizeButton.on("click", function(event) {
            event.preventDefault()
            var chosen = favorites[Math.floor(Math.random() * favorites.length)];
            console.log(chosen);

            let chosenActivity = chosen.activity; 
            var chosenType = chosen.type;
            var chosenPrice =  chosen.price;
            var chosenPart = chosen.participants;
            var chosenAccess = chosen.accessibility;

            function RandomActivityPost() {
                let newEl = $('<div>');
                newEl.addClass("col s12 m12");
                let newCard = $('<div>');
                newCard.addClass("card grey darken-1 card-content white-text");
                let newContent = $('<div>');
                newContent.addClass("card-content white-text");
                let newActivity = $('<h5>');
                newActivity.text('Activity: ' + chosenActivity);
                let newType = $('<h6>');
                newType.text('Type: ' + chosenType);
                let newPrice = $('<h6>');
                newPrice.text('Price: ' + chosenPrice);
                let newPart = $('<h6>');
                newPart.text('Participants: ' + chosenPart);
                let newAcc = $('<h6>');
                newAcc.text('Accessibility: ' + chosenAccess);
            
                newContent.append(newActivity);
                newContent.append(newType);
                newContent.append(newPrice);
                newContent.append(newPart);
                newContent.append(newAcc);
            
                newCard.append(newContent);
                newEl.append(newCard);
                $('#faveIdea').append(newEl);

                randomizeButton.css('display', 'none');
            }
            RandomActivityPost();
        })
    } else {
        var ideaBlock = $("#faveIdea");
        var noIdeas = $('<p>')
        noIdeas.text('Save some favorites so we can help!')
        ideaBlock.append(noIdeas)
    }
}
pageLoad();

// delete button to remove entry from page and local storage
$('.delete').on('click', function(event) {
    event.preventDefault();
    var selButton = $(this);
    var selEntry = selButton.parent();
    var selHeader = selEntry.children().eq(0);
    var selActivity = selHeader[0].innerHTML;
    selActivity = selActivity.replaceAll('Activity: ', '');
    console.log(selActivity);

    var downloadFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (downloadFavorites !== null) {
        for (let i=0; i<downloadFavorites.length; i++) {
            let thisEntry = downloadFavorites[i];
            if (selActivity == thisEntry.activity) {
                downloadFavorites.splice(i, 1);
            }
        }
        localStorage.setItem("favorites", JSON.stringify(downloadFavorites));
    };
    selEntry.remove();
    location.reload();
})