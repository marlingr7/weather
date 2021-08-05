function getDate(day, month, dayNumber, hour, minutes) {
  let dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thersday",
    "Friday",
    "Saturday",
  ];
  let monthName = [
    "January",
    "Febrary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  $("#date").text(dayName[day] + ", " + dayNumber + " " + monthName[month]);
  $(".time").text(hour + ":" + minutes);
  $(".forecast-date").text(function (item) {
    return dayNumber + item + " " + monthName[month];
  });
}
