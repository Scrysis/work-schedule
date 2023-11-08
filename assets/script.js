/* jQuery wrap.  https://stackoverflow.com/questions/1012140/delaying-a-jquery-script-until-everything-else-has-loaded
 */
/* STUDENT NOTES:  NEED A DOCUMENT CALL TO RETRIEVE BASE HTML ELEMENTS.

ITERATE OVER BASE ELEMENTS TO CREATE THE HOURLY SCHEDULE; USE IF/ESLE STATEMENTS TO
COMPARE CURRENT TIME TO TIME BRACKET BEING CREATED TO DETERMINE WHICH CLASS IT BELONGS TO.

THEN CREATE FUNCTION FOR SAVE BUTTON AND LOCAL STORAGE OF NOTES.  MAYBE STORE NOTES IN
AN ARRAY SO THAT MORE THAN ONE CAN BE CREATED FOR ONE PARTICULAR HOUR.*/

/* Retrieves base element from the html so that it can be iterated upon in order to generate the other
elements. Still need to retrieve this before we can pause parts of the script.*/

/* $(document).ready();
 */var baseElement = $(".container-fluid");

 /* Base array to hold user notes.  Base array is going to be populated with additional arrays for each
 slot, even if the array for that slot is empty. */
 var baseArray = [];

 /* Variables and setup for listing the date. */
 
var todayDate = dayjs();
//var dayString = 
$('#currentDay').text(todayDate.format('dddd, MMMM D'));

populate();

 // console.log('baseArray length is: ' + baseArray.length); //diagnostic

  noteRetrieve();
 // console.log('baseArray (check2) length is: ' + baseArray.length);//diagnostic
  noteDisplay();
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
  //console.log('first loop exterior');//diagnostic
  for (var x = 9; x <= 17; x++) {
    console.log('loop ' + x);
    var noteElement = [];
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
    //console.log('hourDisplay: '+ hourDisplay.text());//diagnostic
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
    saveButton.css('background-color', '#06aed5');
    saveButton.css('color', 'white');
    $(saveButton).on('click', noteSave); // each button must be given its own event listener

    /* Adding attributes to the i element. */
    iElement.attr('class', 'fas');
    iElement.addClass('fa-save');
    iElement.attr('aria-hidden', 'true');

    /* Adding i element to the button. */
    saveButton.append(iElement);

    /* Going to push new objects into the base array. */
    baseArray.push(noteElement);
    //console.log(baseArray.length);//diagnostic

    timeSlot.attr('class', 'time-block'); //assigning the time-block class
    timeSlot.attr('id', x); // assigning a unique hour identifier as id
    //timeSlot.attr('data-hour', x); // assigning a data attribute based on hour that will be used to pull notes from storage
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
      //console.log('past');//diagnostic
    }
    else if(x === currentTime){
      timeSlot.addClass('present');
      //console.log('present');//diagnostic
    }
    else{
      timeSlot.addClass('future');
      //console.log('future');//diagnostic
    }
    baseElement.append(timeSlot);
  }
  
}

/* Function to save notes; referenced https://www.geeksforgeeks.org/difference-between-this-and-this-in-jquery/ 
for clarification on the use of 'this' in jQuery.  Also used https://api.jquery.com/siblings/  */
function noteSave(){
 // event.preventDefault();
 
  var userNote = $(this).siblings('textarea').val(); //  retrieves the data from the textbox
  //console.log(userNote); //diagnostic
  $(this).siblings('textarea').text(userNote); // set the text behind the text area to the new user input
  var hourID = $(this).parent().attr('id'); // retrieving the unique timeslot id based on hour
  //console.log(hourID); // diagnostic
  
  baseArray[Number(hourID)-9] = userNote.trim(); /* Set the slot corresponding to the
  hour to the new text */

  localStorage.setItem('baseArray', JSON.stringify(baseArray)); /* Sending the array to local storage. */
}

/* Need to run a function that retrieves and displays notes. */
function noteRetrieve(){
  // retrieve user data from local storage.
  var baseArray2 = JSON.parse(localStorage.getItem('baseArray'));
  /* If there is something in the array, copy the retrieved array to the baseArray. */
  if (baseArray2 !== null){
    baseArray = baseArray2;
  }
}
/* Iterate over the original set of numbers used to create the work schedule in order to simultanesously
retrieve the information from baseArray (using a set of shifted numbers) and access the IDs for the textarea
elements. */
function noteDisplay(){
  for(var x=9; x <= 17; x++){
    var tempNotes = baseArray[x-9]; // need to adjust for the shift
    //console.log('tempNotes #'+ x + ': '+ tempNotes); //diagnostic
    var idString = '#' + x;
    $(idString).children('textarea').text(tempNotes); //writing retrieved data to the text area.
    
  }
}



