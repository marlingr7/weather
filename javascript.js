let date = new Date();

let day = date.getDay();
let month = date.getMonth();
let dayNumber = date.getDate();
let year = date.getFullYear();
var hour = date.getHours();
let minutes = date.getMinutes();

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

let urlFix =
  "https://api.weatherapi.com/v1/forecast.json?key=7ee0e3877426440b807213507210308&q=guadalajara&days=4&aqi=no&alerts=no";

$.ajax({
  url: urlFix,
  dataType: "json",
  success: function (response) {
    $("h2").text(Math.round(response.current["temp_c"])).append("o".sup());
    $("#event").text(response.current.condition.text);
    $("#icon").attr("src", "https:" + response.current.condition.icon);
    $("#wind").text(response.current["wind_kph"] + " km/h");
    $("#humidity").text(response.current["humidity"] + " %");
    $("#visibility").text(response.current["vis_km"] + " Km");

    $(".temp-forecast")
      .text(function (item) {
        return Math.round(
          response.forecast.forecastday[item].hour[hour]["temp_c"]
        );
      })
      .append("o".sup());
    $(".icon-forecast").attr("src", function (item) {
      return (
        "https:" + response.forecast.forecastday[item].hour[hour].condition.icon
      );
    });
  },
});

$("#btn-theme").click(function (e) {
  let elements = [
    ".body-light",
    ".temp-light",
    ".text-light",
    ".nav-light",
    ".circle-light",
    ".variables-light",
    ".forecast-light",
    ".day-forecast-light",
  ];
  let className = [
    "body-dark",
    "temp-dark",
    "text-dark",
    "nav-dark",
    "circle-dark",
    "variables-dark",
    "forecast-dark",
    "day-forecast-dark",
  ];

  for (i = 0; i < elements.length; i++) {
    $(elements[i]).toggleClass(className[i]);
  }
  e.preventDefault();
});

$("#btn-hidden").click(function (e) {
  $(".input").toggleClass("hidden");
  e.preventDefault();
});

function findWeather(e) {
  if ($("input").val() == "") {
    $("input").attr("placeholder", "You must introduce some direction");
  } else {
    let place = $("input").val();
    let urlFirst =
      "https://api.weatherapi.com/v1/forecast.json?key=7ee0e3877426440b807213507210308&q=";
    let urlLast = "&days=4&aqi=no&alerts=no";
    let url = urlFirst + place + urlLast;

    $.ajax({
      url: url,
      dataType: "json",
      success: function (response) {
        $("h2").text(Math.round(response.current["temp_c"])).append("o".sup());
        $("#event").text(response.current.condition.text);
        $("#icon").attr("src", "https:" + response.current.condition.icon);
        $("#wind").text(response.current["wind_kph"] + " km/h");
        $("#humidity").text(response.current["humidity"] + " %");
        $("#visibility").text(response.current["vis_km"] + " Km");
        $(".temp-forecast")
          .text(function (item) {
            return Math.round(
              response.forecast.forecastday[item].hour[hour]["temp_c"]
            );
          })
          .append("o".sup());
        $(".icon-forecast").attr("src", function (item) {
          return (
            "https:" +
            response.forecast.forecastday[item].hour[hour].condition.icon
          );
        });
      },
    });
  }
  e.preventDefault();
}

$("#btn-search").click(findWeather);

let states = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colim",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

$(document).keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    findWeather();
  }
});
