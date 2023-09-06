exports.delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
exports.inSeconds = seconds => seconds * 1000;

exports.calendarMonth = (month) => 
{
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
    ]

    let currentMonth = months[month]
    let currentYear = new Date().getFullYear();

    return currentMonth + ' ' + currentYear;
}