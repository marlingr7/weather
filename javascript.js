function initialData() {
  $("#date").text(moment().format("dddd" + ", " + "Do MMMM"));
  $(".time").text(time);
  $(".forecast-date").text(function (item) {
    return moment().add(item, "days").format("Do MMMM");
  });

  let placeFix = "Guadalajara";
  let latFix = 20.670704;
  let lonFix = -103.344226;

  req(latFix, lonFix, placeFix, hour);
}

function success(position) {
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  let map = new google.maps.Map(document.getElementById("google-map"), {
    center: { lat: pos.lat, lng: pos.lng },
    zoom: 12,
  });
  $(".map").removeClass("visibility");
  req(pos.lat, pos.lng, "", hour);
  let marker = new google.maps.Marker({
    position: { lat: pos.lat, lng: pos.lng },
    map: map,
    icon: "https:" + $("#icon").data("icon").today,
    draggarble: true,
  });
  let information = new google.maps.InfoWindow({
    content:
      "<p class='text light p-popop'>" +
      temp.data("tmp").celsius[0] +
      "<sup>o</sup>C/ " +
      temp.data("tmp").farenheit[0] +
      "<sup>o</sup>F</p>",
  });
  marker.addListener("click", function () {
    information.open(map, marker);
  });
}

function error() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Error: The Geolocation service failed."
  })
}

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    // Browser doesn't support Geolocation
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Error: Your browser doesn't support geolocation"
    })
  }
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
    ".canvas-light",
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
    "canvas-dark",
  ];

  for (i = 0; i < elements.length; i++) {
    $(elements[i]).toggleClass(className[i]);
  }
}

function findWeather() {
  if (input.val() == "") {
    input.attr("placeholder", "You must introduce some state");
  } else {
    let place = input.val();
    req("", "", place, hour);
  }
}

//Variables

let input = $("input");
let btnGeo = $("#btn-geo");
let placeOut = $("#place");
let temp = $("#temp");
let span = $("span");
let sub = $("sub");
let dayForecast = $(".day-forecast");
let hour = parseInt(moment().format("HH"));
let time = moment().format("LT");
let audio = document.getElementById("player");
let count = 0;

let myChart, myChart2, myChart3;

//Events

initialData();

input.on("input", function () {
  let key = this.value;
  select(key);
});

input.click(function (e) {
  btnGeo.removeClass("visibility");
  e.preventDefault();
});

btnGeo.click(function (e) {
  navigator.geolocation.getCurrentPosition(success, error);
  if (btnGeo.hasClass("visibility") == false) {
    btnGeo.addClass("visibility");
    input.val("");
  }
  e.preventDefault();
});

$("#btn-next-hours").click(function (e) {
  $("#main").addClass("hidden");
  $("#scroll").removeClass("hidden");
  e.preventDefault();
});

$("#btn-return-scroll").click(function (e) {
  $("#scroll").addClass("hidden");
  $("#main").removeClass("hidden");
  e.preventDefault();
});

$("#btn-watch-map").click(function (e) {
  $("#main").addClass("hidden");
  $("#map").removeClass("hidden");
  e.preventDefault();
});

$("#btn-return-map").click(function (e) {
  $("#map").addClass("hidden");
  $("#main").removeClass("hidden");
  e.preventDefault();
});

$("#btn-theme").click(changeTheme);

$("#icon").click(function (e) {
  console.log(audio);
  if (count == 0) {
    count = 1;
    audio.play();
  } else {
    count = 0;
    audio.pause();
  }
  e.preventDefault();
});


$("#btn-hidden").click(function (e) {
  $(".input").toggleClass("visibility");
  e.preventDefault();
});

$("#btn-search").click(findWeather);

temp.click(function () {
  temp.each(function () {
    if ($(this).find(span).text() == temp.data("tmp").celsius[0]) {
      $(this).find(span).text(temp.data("tmp").farenheit[0]);
      $(this).find(sub).text("F");
      $(".temp-forecast span").text(function (item) {
        return temp.data("tmp").farenheit[item];
      });
    } else {
      $(this).find(span).text(temp.data("tmp").celsius[0]);
      $(this).find(sub).text("C");
      $(".temp-forecast span").text(function (item) {
        return temp.data("tmp").celsius[item];
      });
    }
  });
});

$(".temp-max-min").click(function () {
  $(".temp-hour").empty();
  $(".temp-hour-fix").empty();
  if (
    $(".temp-max-min span:first").text() ==
    $(".temp-max-min").data("temp-max-min").celsius[0]
  ) {
    $(".temp-max-min span").text(function (item) {
      return $(".temp-max-min").data("temp-max-min").farenheit[item];
    });
    for (let j = hour; j < 24; j++) {
      $(".temp-hour").append(
        "<p class='text-light'>" +
          $(".temp-hour").data("temp-hour").farenheit[j] +
          "<sup>o</sup></p>"
      );
    }
    for (let i = 0; i < 24; i++) {
      $(".temp-hour-fix").append(function (item) {
        return (
          "<p class='text-light'>" +
          $(".temp-hour").data("temp-hour").farenheit[(item + 1) * 24 + i] +
          "<sup>o</sup></p>"
        );
      });
    }
  } else {
    $(".temp-max-min span").text(function (item) {
      return $(".temp-max-min").data("temp-max-min").celsius[item];
    });
    for (let j = hour; j < 24; j++) {
      $(".temp-hour").append(
        "<p class='text-light'>" +
          $(".temp-hour").data("temp-hour").celsius[j] +
          "<sup>o</sup></p>"
      );
    }
    for (let i = 0; i < 24; i++) {
      $(".temp-hour-fix").append(function (item) {
        return (
          "<p class='text-light'>" +
          $(".temp-hour").data("temp-hour").celsius[(item + 1) * 24 + i] +
          "<sup>o</sup></p>"
        );
      });
    }
  }
});

$(".btn-forecast").click(function (item) {
  $(".btn-forecast").removeClass("purple");
  $(this).addClass("purple");
  switch ($(this).data("day")) {
    case "today":
      temp.find(span).text(temp.data("tmp").celsius[0]);
      $("#icon").css(
        "background-image",
        "url(https:" + $("#icon").data("icon").today + ")"
      );
      $("#event").text($("#event").data("event").today);
      $("#wind").find(span).text($("#wind").data("wind").today);
      $("#humidity").find(span).text($("#humidity").data("humidity").today);
      $("#visibility")
        .find(span)
        .text($("#visibility").data("visibility").today);
      $("#date").text(
        moment()
          .add(0, "days")
          .format("dddd" + ", " + "Do MMMM")
      );
      break;
    case "tomorrow":
      temp.find(span).text(temp.data("tmp").celsius[1]);
      $("#icon").css(
        "background-image",
        "url(https:" + $("#icon").data("icon").tomorrow + ")"
      );
      $("#event").text($("#event").data("event").tomorrow);
      $("#wind").find(span).text($("#wind").data("wind").tomorrow);
      $("#humidity").find(span).text($("#humidity").data("humidity").tomorrow);
      $("#visibility")
        .find(span)
        .text($("#visibility").data("visibility").tomorrow);
      $("#date").text(
        moment()
          .add(1, "days")
          .format("dddd" + ", " + "Do MMMM")
      );
      break;
    case "after-tomorrow":
      temp.find(span).text(temp.data("tmp").celsius[2]);
      $("#icon").css(
        "background-image",
        "url(https:" + $("#icon").data("icon").afterTomorrow + ")"
      );
      $("#event").text($("#event").data("event").afterTomorrow);
      $("#wind").find(span).text($("#wind").data("wind").afterTomorrow);
      $("#humidity")
        .find(span)
        .text($("#humidity").data("humidity").afterTomorrow);
      $("#visibility")
        .find(span)
        .text($("#visibility").data("visibility").afterTomorrow);
      $("#date").text(
        moment()
          .add(2, "days")
          .format("dddd" + ", " + "Do MMMM")
      );
    default:
      break;
  }
});

$(document).keypress(function (event) {
  let keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    findWeather();
  }
});

$(document).click(function (event) {
  if (
    event.target !== "p.p-poss.text-light" ||
    event.target !== "p.p-posible.text-light.text-dark"
  ) {
    $("#poss").empty();
  }
  event.preventDefault();
});
