// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
/* jQuery wrap.  https://stackoverflow.com/questions/1012140/delaying-a-jquery-script-until-everything-else-has-loaded
 */
/* STUDENT NOTES:  NEED A DOCUMENT CALL TO RETRIEVE BASE HTML ELEMENTS.

ITERATE OVER BASE ELEMENTS TO CREATE THE HOURLY SCHEDULE; USE IF/ESLE STATEMENTS TO
COMPARE CURRENT TIME TO TIME BRACKET BEING CREATED TO DETERMINE WHICH CLASS IT BELONGS TO.

THEN CREATE FUNCTION FOR SAVE BUTTON AND LOCAL STORAGE OF NOTES.  MAYBE STORE NOTES IN
AN ARRAY SO THAT MORE THAN ONE CAN BE CREATED FOR ONE PARTICULAR HOUR.*/

/* Retrieves base element from the html so that it can be iterated upon in order to generate the other
elements. Still need to retrieve this before we can pause parts of the script.*/

$(document).ready();
var baseElement = $(".container-fluid");

/* The Populate function.  We're going to populate the html with time slot elements first before
we retrieve them to add and display notes with them.  We're going to first retrieve the user's 
current time in hours (24 hr format) and then, in a loop that iterates over the available hours,
compare the user's current time to the time slot in order to determine what color class the timeslot
is going to be generated as.*/

function populate() {
  var today = new Date();  /* https://tecadmin.net/get-current-date-time-javascript/  ; Get a new date object so
 that we can get the current hour.*/
  var currentTime = today.getHours(); /* gets the current hour between 0 and 23; we only want to retrieve the hour once
  because this portion of the script will load once the pages is loaded. */

  /* We want the scheduler to show the "standard" working hours between 9am to 5pm.  Because our current time is returned
  as a number between 0 & 23, we're going to convert our working hours to that same format and use the loop to iterate over
  those hours. */
  for (var x = 9; x <= 17; x++) {
    /* Need to create the div element that we'll be using in the populate function. */
    var timeSlot = $('<div>');
    /* Need to create a div element to display the hour text. */
    var hourDisplay = $('<div>');
    /* Need a text area for users to enter and display notes. */
    var textDisplay = $('<textarea>');
    /* Need a button for users to interact with in order to save. */
    var saveButton = $('<button>');
    /* Need an i element. */
    var iElement = $('<i>');
    // col-2 col-md-1 hour text-center py-3
    hourDisplay.attr('class', 'hour');
    hourDisplay.addClass('col-2');
    hourDisplay.addClass('col-md-1');
    hourDisplay.addClass('text-center');
    hourDisplay.addClass('py-3');
    /* The following series of if/else statements are used to display the
    hour in am/pm format instead of 24 hour format. */
    if(x < 12){ // am time
      hourDisplay.text(x + ' am');
    }
    else if (x == 12){ // noon
      hourDisplay.text(x + " pm");
    }
    else{ // pm times
      hourDisplay.text((x-12) + ' pm');
    }
    /* Adding class attributes to the text box. */
    textDisplay.attr('class', 'description');
    textDisplay.addClass('col-8');
    textDisplay.addClass('col-md-10');
    textDisplay.attr('rows', '3');

    /* Adding class attributes to the button element. */
    saveButton.attr('class', 'btn');
    saveButton.addClass('savebtn');
    saveButton.addClass('col-2');
    saveButton.addClass('col-md-1');

    /* Adding attributes to the i element. */
    iElement.attr('class', 'fas');
    iElement.addClass('fa-save');
    iElement.attr('aria-hidden', 'true');

    /* Adding i element to the button. */
    saveButton.append(iElement);

    

    timeSlot.attr('class', 'time-block'); //assigning the time-block class
    timeSlot.attr('id', 'hour' + x); // assigning a unique hour identifier
    timeSlot.addClass('row'); //adding classes
    /* Appending features to the timeSlot. */
    timeSlot.append(hourDisplay); // adding the hour display
    timeSlot.append(textDisplay); // adding the text field
    timeSlot.append(saveButton); // adding the save button

    /* Following series of if/else statements modify the timeSlot element
    after comparing the value of the current time to the current loop iteration.
    Loop iterations are designed to go through each hour (in 24h format) in the work
    day schedule. */
    if (x < currentTime) { // the time slot to be rendered is in the past

      timeSlot.addClass('past'); // adding the past class
    }
    else if(x === currentTime){
      timeSlot.addClass('present');
    }
    else{
      timeSlot.addClass('future');
    }
  }
}

/* 
$(document).ready(); // NYI -- all document calls FOR ADDED ELEMENTS in the first parenthesis
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
 */

populate();