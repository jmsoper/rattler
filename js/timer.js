document.addEventListener('DOMContentLoaded', function(){

  var rightNow = new Date();
  var twoMinuteDeadline = new Date(rightNow.getTime() + 2*60000);

  console.log(twoMinuteDeadline);

  //basically construct a time object with minutes and seconds and countdown.
  //set an interval and output the time every second to render in the clock.
  //stop at 0, and stop the game too.

}, false);
