// welcome modal upon page load
$(document).ready(function(){
    $('#journalModal').modal();
    $('#journalModal').modal('open');
    $('select').formSelect();
    $('.datepicker').datepicker();
    $('.feelings').autocomplete({
        data: {
          "Anxious": null,
          "Miserable": null,
          "Nervous": null,
          "Bored": null,
          "Happy": null,
          "Surprised": null,
          "Fear": null,
          "Sad": null,
          "Confused": null,
          "Skeptical": null,
          "Unsure": null,
          "Encouraged": null,
          "Hesitant": null,
          "Perplexed": null,
          "Stunned": null,
          "Glad": null,
          "Pessimistic": null,
          "Upset": null,
          "Delighted": null,
          "Interested": null,
          "Angry": null,
          "Afraid": null,
          "Joyful": null,
          "Tense": null,
          "Shy": null,
          "Loving": null,
          "Annoyed": null,
          "Curious": null,
          "Fulfilled": null,
          "Complete": null,
          "Ecstatic": null,
          "Energetic": null,
          "Satisfied": null,
          "Pleased": null,
          "Optimistic": null,
        },
      });
  });

var journalEntries = [];  
// Recalls journal entries from previous logs
function pageLoad() {
    var downloadedEntries = JSON.parse(localStorage.getItem("entries"));
    if (downloadedEntries !== null) {
        journalEntries = downloadedEntries;
        for (let i = journalEntries.length-1; i>=0; i--) {
            var thisEntry = journalEntries[i]
            postEntry(thisEntry.activity, thisEntry.date, thisEntry.before, thisEntry.after, thisEntry.textinput);
        }
    }
}
pageLoad();

//   click event for submit journal entry
$('#submitentry').on("click", function (event) {
    event.preventDefault();

// identify information
    var activityCompleted = $('#activity').val().trim();
    var dateCompleted = $('#when').val();
    var feelingsBefore = $('#before').val().trim();
    var feelingsAfter = $('#after').val().trim();
    var comments = $('#write').val().trim();
    console.log(activityCompleted, dateCompleted, feelingsBefore, feelingsAfter, comments);

    if (activityCompleted || dateCompleted || feelingsBefore || feelingsAfter || comments) {
    postEntry(activityCompleted, dateCompleted, feelingsBefore, feelingsAfter, comments);

    // save to local storage
    var journalObject = {
        activity: activityCompleted,
        date: dateCompleted,
        before: feelingsBefore,
        after: feelingsAfter,
        textinput: comments
    }

    saveEntry(journalObject);

    // clear input fields
    $('#activity').val('');
    $('#when').val('');
    $('#before').val('');
    $('#after').val('');
    $('#write').val('');
}

$('.delete').on('click', function() {
    var selButton = $(this);
    var selEntry = selButton.parent();
    var selHeader = selEntry.children().eq(0);
    var selActivity = selHeader[0].innerHTML;
    selActivity = selActivity.replaceAll('Activity: ', '');
    console.log(selActivity);

    var storedEntries = JSON.parse(localStorage.getItem("entries"));
    if (storedEntries !== null) {
        for (let i=0; i<storedEntries.length; i++) {
            let thisEntry = storedEntries[i];
            if (selActivity == thisEntry.activity) {
                storedEntries.splice(i, 1);
            }
        }
        localStorage.setItem("entries", JSON.stringify(storedEntries));
    };
    selEntry.remove();
    location.reload();
    })

})

function postEntry(activity, date, before, after, comments) {
    let newEl = $('<div>');
    newEl.addClass("col s12 m6");
    let newCard = $('<div>');
    newCard.addClass("card grey darken-1 card-content white-text");
    let newContent = $('<div>');
    newContent.addClass("card-content white-text");
    let newActivity = $('<h5>');
    newActivity.text('Activity: ' + activity);
    let newDate = $('<h6>');
    newDate.text('Date: ' + date);
    let newBefore = $('<h6>');
    newBefore.text('How you were feeling before: ' + before);
    let newAfter = $('<h6>');
    newAfter.text('How you were feeling after: ' + after);
    let newComments = $('<p>');
    newComments.text('Your comments: ' + comments);
    let newButton = $('<button>')
    newButton.addClass('delete grey darken-1 waves-effect waves-orange btn custom-btn');
    newButton.text('Delete Entry')

    newContent.append(newActivity);
    newContent.append(newDate);
    newContent.append(newBefore);
    newContent.append(newAfter);
    newContent.append(newComments);
    newContent.append(newButton);

    newCard.append(newContent);
    newEl.append(newCard);
    $('#journalResults').append(newEl);
}

function saveEntry(object) {
    // SAVE TO LOCAL STORAGE
    var storedEntries = JSON.parse(localStorage.getItem("entries"));
    if (storedEntries !== null) {
        journalEntries = storedEntries;
    }
    journalEntries.push(object);
    localStorage.setItem("entries", JSON.stringify(journalEntries));
}

$('.delete').on('click', function() {
    var selButton = $(this);
    var selEntry = selButton.parent();
    var selHeader = selEntry.children().eq(0);
    var selActivity = selHeader[0].innerHTML;
    selActivity = selActivity.replaceAll('Activity: ', '');
    console.log(selActivity);

    var storedEntries = JSON.parse(localStorage.getItem("entries"));
    if (storedEntries !== null) {
        for (let i=0; i<storedEntries.length; i++) {
            let thisEntry = storedEntries[i];
            if (selActivity == thisEntry.activity) {
                storedEntries.splice(i, 1);
            }
        }
        localStorage.setItem("entries", JSON.stringify(storedEntries));
    };
    selEntry.remove();
    location.reload();
})