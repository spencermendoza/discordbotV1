//start sep 6th, if 1 day {'whos good for (week from sep 6th)'}, if 3 days {'whos good for (week from sep 6th)'},
//if 5 days {'whos good for (week from sep 6th)'}, if 6 days {'reminder: were (not?) playing ('(week from sep 6th)')},
//if 7 days {reset date to today}

var workingDate = new Date('September 6, 2020');

let dateHandler = function () {
    return hoursSinceWorkingDate();
}

let hoursSinceWorkingDate = function () {
    var workingDateHours = dateSimplifyToHours(workingDate)
    var todayHours = dateSimplifyToHours(new Date())
    var hoursSince = todayHours - workingDateHours;
    return hoursSince;
}

dateSimplifyToHours = function (date) {
    var seconds = date / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    return hours;
}

let checking = function () {
    console.log('you bitch');
}

let printMilli = function () {
    var prevDate = new Date('September 6, 2020 9:00:00');
    var seconds = (prevDate.getTime() / 1000);
    var minutes = millis / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

    console.log('seconds between 9/6 and 1/1/1970: ', seconds);
    console.log('minutes between 9/6 and 1/1/1970: ', minutes)
    console.log('hours between 9/6 and 1/1/1970: ', hours)
    console.log('days between 9/6 and 1/1/1970: ', days)
    console.log('years between 9/6/ and 1/1/1970: ', years)
}

let timeBetween = function () {
    const originDateMillis = new Date('September 6, 2020').getTime();
    const todayMillis = new Date().getTime();
    const originDateHours = (((originDateMillis / 1000) / 60) / 60);
    const todayHours = (((todayMillis / 1000) / 60) / 60);
    const hoursSince = todayHours - originDateHours;

    // console.log(hoursSince)

    if (hoursSince === 336) {
        return true;
    } else {
        return false;
    }

}




module.exports = {
    dateHandler,
    hoursSinceWorkingDate,
    checking,
    printMilli,
    timeBetween,
}