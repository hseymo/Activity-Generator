var favorites = [];

function pageLoad() {
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
            console.log(thisEntry, thisActivity, thisType, thisPrice, thisPart, thisAccess)

            postEntry()

            function postEntry() {
                let newEl = $('<div>');
                newEl.addClass("col s12 m6");
                let newCard = $('<div>');
                newCard.addClass("card blue-grey darken-1 card-content white-text");
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
            
                newContent.append(newActivity);
                newContent.append(newType);
                newContent.append(newPrice);
                newContent.append(newPart);
                newContent.append(newAcc);
            
                newCard.append(newContent);
                newEl.append(newCard);
                $('#cardsection').append(newEl);
            }

        

        }
    }
}
pageLoad();

function postEntry(activity, type, price, participants, accessibility) {
    let newEl = $('<div>');
    newEl.addClass("col s12 m6");
    let newCard = $('<div>');
    newCard.addClass("card blue-grey darken-1 card-content white-text");
    let newContent = $('<div>');
    newContent.addClass("card-content white-text");
    let newActivity = $('<h5>');
    newActivity.text('Activity: ' + activity);
    let newType = $('<h6>');
    newType.text('Type: ' + type);
    let newPrice = $('<h6>');
    newPrice.text('Price: ' + price);
    let newPart = $('<h6>');
    newPart.text('Participants: ' + participants);
    let newAcc = $('<h6>');
    newAcc.text('Accessibility: ' + accessibility);

    newContent.append(newActivity);
    newContent.append(newType);
    newContent.append(newPrice);
    newContent.append(newPart);
    newContent.append(newAcc);

    newCard.append(newContent);
    newEl.append(newCard);
    $('#favorites').append(newEl);
}