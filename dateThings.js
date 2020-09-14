//start sep 6th, if 1 day {'whos good for (week from sep 6th)'}, if 3 days {'whos good for (week from sep 6th)'},
//if 5 days {'whos good for (week from sep 6th)'}, if 6 days {'reminder: were (not?) playing ('(week from sep 6th)')},
//if 7 days {reset date to today}

var workingDate = new Date('September 6, 2020');
var caseAnswer = 'fake';

let dateHandler = function () {
    dayChecker();
    return caseAnswer;
}

let dayChecker = function () {
    var todayNumber = new Date().getDay();
    if (todayNumber === 1 || todayNumber === 3 || todayNumber === 5) {
        caseAnswer = 'case135';
        return caseAnswer;
    } else if (todayNumber === 6) {
        caseAnswer = 'case6';
        return caseAnswer;
    } else if (todayNumber === 0) {
        workingDate = new Date();
        caseAnswer = 'case7';
        return caseAnswer;
    } else {
        caseAnswer = 'case0';
        return caseAnswer;
    }
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
}