function initialData() {
  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let dayNumber = date.getDate();
  let hourFix = date.getHours();
  let minutes = date.getMinutes();
  getDate(day, month, dayNumber, hourFix, minutes);

  let placeFix = "Guadalajara";
  req(placeFix, hourFix);
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

//Events

initialData();
select();

$("#btn-theme").click(changeTheme);
$("#btn-hidden").click(function (e) {
  $(".input").toggleClass("hidden");
  e.preventDefault();
});

function findWeather() {
  if ($("input").val() == "") {
    $("input").attr("placeholder", "You must introduce some state");
  } else {
    let date = new Date();
    let hour = date.getHours();
    let place = $("input").val();
    
    req(place, hour);
  }
}

$("#btn-search").click(findWeather);

$(document).keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    findWeather();
  }
});



