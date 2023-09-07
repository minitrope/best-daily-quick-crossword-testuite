exports.delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
exports.inSeconds = seconds => seconds * 1000;

exports.calendarMonth = (month) => {
    const months = [
        'January',
        'February',
        'Mars',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'November',
        'December'
    ];

    let fullMonth = months[month]
    let fullYear = new Date().getFullYear();

    return fullMonth + ' ' + fullYear;
}

exports.dayOfTheWeek = (date) => {
    const days = [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN"
    ];

    let day = days[date.getDay() - 1];
    return day;
}