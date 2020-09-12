//start sep 6th, if 1 day {'whos good for (week from sep 6th)'}, if 3 days {'whos good for (week from sep 6th)'},
//if 5 days {'whos good for (week from sep 6th)'}, if 6 days {'reminder: were (not?) playing ('(week from sep 6th)')},
//if 7 days {reset date to today}

var workingDate = new Date('September 6, 2020');
var caseAnswer = 'fake';

let dateHandler = function () {
    // setInterval(function () {
    //     dateChecker();
    //     return caseAnswer;
    //     // console.log(caseAnswer)
    // }, 1000);
    dateChecker();
    return caseAnswer;
    // console.log('dateChecker log: ', caseAnswer);
}

let dateChecker = function () {
    var hoursElapsed = Math.floor(hoursSinceWorkingDate());
    if (hoursElapsed === 24 || hoursElapsed === 72 || hoursElapsed === 120) {
        caseAnswer = 'case135';
        return caseAnswer;
    } else if (hoursElapsed === 144) {
        caseAnswer = 'case6';
        return caseAnswer;
    } else if (hoursElapsed === 168) {
        workingDate = new Date();
        caseAnswer = 'case7';
        return caseAnswer;
    } else {
        caseAnswer = 'case0';
        console.log('floor hours: ', hoursElapsed)
        return console.log('dateThings: ', caseAnswer)
    }
}

//returns how many hours between the working date and when this function was called
let hoursSinceWorkingDate = function () {
    var workingDateHours = dateSimplifyToHours(workingDate)
    var todayHours = dateSimplifyToHours(new Date())
    var hoursSince = todayHours - workingDateHours;
    return hoursSince;
}

//simplifies milliseconds to hours
dateSimplifyToHours = function (date) {
    var seconds = date / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    return hours;
}

module.exports = {
    dateHandler,
    hoursSinceWorkingDate,
}