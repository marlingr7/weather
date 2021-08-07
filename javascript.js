function initialData() {
  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let dayNumber = date.getDate();
  let hourFix = date.getHours();
  let minutes = date.getMinutes();
  getDate(day, month, dayNumber, hourFix, minutes);

  let placeFix = "Guadalajara";
  req(placeFix, hourFix, "Today");
}

function changeTheme() {
  let elements = [
    ".body-light",
    ".main-light",
    ".current-light",
    ".text-light",
    ".nav-light",
    ".circle-light",
    ".variables-light",
    ".forecast-light",
    ".day-forecast-light",
  ];
  let className = [
    "body-dark",
    "main-dark",
    "current-dark",
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
}

function findWeather() {
  if ($("input").val() == "") {
    $("input").attr("placeholder", "You must introduce some state");
  } else {
    let date = new Date();
    let hour = date.getHours();
    let place = $("input").val();

    req(place, hour, "Today");
  }
}

//Events

initialData();

$("#into").on("input", function () {
  let key = this.value;
  select(key);
});

$("#btn-theme").click(changeTheme);
$("#btn-hidden").click(function (e) {
  $(".input").toggleClass("hidden");
  e.preventDefault();
});

$("#btn-search").click(findWeather);
$(".day-forecast").click(function (item) {
  $(".day-forecast").find(".day-forecast-light").removeClass("purple");
  $(this).find(".day-forecast-light").addClass("purple");
  let day = $(this).find("p:first").text();
  if ($("input").val() == "") {
    let date = new Date();
    let hourFix = date.getHours();
    let placeFix = "Guadalajara";
    req(placeFix, hourFix, day);
  } else {
    let date = new Date();
    let hour = date.getHours();
    let place = $("input").val();
    req(place, hour, day);
  }
});

$(document).keypress(function (event) {
  let keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    findWeather();
  }
});

$(document).click(function (event) {
  if (event.target !== "p.p-posible.text-light") {
    $("#posible").empty();
  }
  event.preventDefault();
});
