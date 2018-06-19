// created by https://www.reddit.com/user/Comic_Sads
// created trying to convert dates in the gregorian callendar to http://www.internationalfixedcalendar.com/

// code below courtesy of https://stackoverflow.com/a/8619946

function dayInYear(dateString) {
  var now = new Date(dateString);
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return(day);
}

// code above courtesy of https://stackoverflow.com/a/8619946

var months = ["January", "Feburary", "March", "April", "May", "June", "Sol", "July", "August", "September", "October", "November", "December"]
var keepGoing=true
var current = new Date()
var day = dayInYear(current)
var iHateLeapDays = 0;
var lookAtMe;
// lookAtMe is the final output of the program, iHateLeapDays is supposed to tell whether or not a leap day has passed, keepGoing is to tell the program not to output twice on a leapday, months is an array of the months in the IFC


function leap() { // this function gets called later in the program
  if(day>169) {
    iHateLeapDays = 1 //iHateLeapDays is the amount subtracted from the date to counteract the leap day
  }
  if(day==169) {
    lookAtMe = "It is leap day"
    keepGoing=false //the date 169 is inbetween June and Sol, this function will be called and be outputted instead of the normal output using keepGoing
  }
}

function toIFC() {
var month = 1 //month set to January
if(current.getFullYear()%4==0&&current.getFullYear()%100!=0) {leap()} else if (current.getFullYear()%400==0) {leap()} //check if leapday before doing any math so that the date isn't off by a day
day = day-iHateLeapDays //if necessary, counteract leap days
  if(day==365 || day==366) {
    keepGoing=false;
    lookAtMe="It is year day" // if it's the last day of the year, it's year day and the normal output is turned off using keepGoing
  } else if(day>=28) {
  month = Math.ceil(day/28)
  day = day%28 //each month in the IFC is exactly 28 days long so it's easy to figure out the the month and day knowing the date of the year
  if(day==0) {day=28} // prevents output like "The 0th of March"
}
month=month-1 //change month to coorperate with array later
if(keepGoing==true) { // check to see if year day or leap day
  var ord; //adds ordinal numbers for human readable text(1'st', 2'nd', 3'rd') if you're trying to use this code, my only suggestion is good luck, and  notice that the ordinal text is always 2 letters long, and that year day and leap day lack the word the. I MIGHT try to add in support for different date formatting (yy-mm-dd) if I can will myself to do so
  switch (day) {
    case 1:
        ord = "st";
        break;
    case 2:
        ord = "nd";
        break;
    case 3:
        ord = "rd";
        break;
    default:
    	ord = "th";
}
  lookAtMe = "It is the " + day + ord + " of " + months[month]
}
return lookAtMe;
}
console.log(toIFC())
