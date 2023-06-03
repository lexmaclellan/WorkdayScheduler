// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  var today = dayjs();
  var currentDay = $('#currentDay');
  
  // Listens for click events on the save button and stores user inputted events in localStorage.
  $(".saveBtn").on ('click', function() {
    var time = $(this).parent().attr("id");
    var value = $(this).siblings(".description").val();

    if (value) {
      localStorage.setItem(time, value);
    }
    else {
      localStorage.removeItem(time);
    }
  })

  // Applies the past, present, or future class to each time block.
  $(".time-block").each(function() {
    var currentHour = dayjs().hour();
    var currentID = $(this).attr("id");
    
    var blockHour = parseInt(currentID.split("-")[1]);
    
    if (blockHour < currentHour) {
      $(this).addClass("past");
    }
    else if (blockHour === currentHour) {
      $(this).addClass("present");
    }
    else {
      $(this).addClass("future");
    }

  // Loads events from localStorage
    var storage = localStorage.getItem(currentID);
    if (storage) {
      $(this).children(".description").val(storage);
    }
  })
  

  // Displays the current date in the header of the page.
  currentDay.text(today.format('MMM D, YYYY'));
});
