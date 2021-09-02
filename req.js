function chart(x, y, day, hour, event, vv, wind, hh) {
  const DATA_COUNT = x;
  const labels = [];
  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push((i + parseInt(hour)).toString());
  }
  const datapoints = y;
  const data = {
    labels: labels,
    datasets: [
      {
        data: datapoints,
        borderColor: "rgba(101, 73, 187, 255)",
        fill: "start",
        tension: 0.6,
        label: "Temperature",
      },
    ],
  };
  const footer = (tooltipItems) => {
    let eventFooter = [];
    let humidityFooter = [];
    let windFooter = [];
    let visibilityFooter = [];

    tooltipItems.forEach(function (tooltipItem) {
      eventFooter = event[tooltipItem.dataIndex];
      humidityFooter = hh[tooltipItem.dataIndex];
      windFooter = wind[tooltipItem.dataIndex];
      visibilityFooter = vv[tooltipItem.dataIndex];
    });
    return (
      "Situation: " +
      eventFooter +
      "\nHumidity: " +
      humidityFooter +
      " % \nVisibility: " +
      visibilityFooter +
      " Km \nWind: " +
      windFooter +
      " km/h"
    );
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            labelColor: function (context) {
              return {
                borderColor: "rgba(101, 73, 187, 255)",
                backgroundColor: "rgba(101, 73, 187, 0.5)",
                borderWidth: 2,
                borderRadius: 2,
              };
            },
            footer: footer,
          },
        },
        title: {
          display: true,
          text: "Temperature - " + day,
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Temperature (C)",
          },
          suggestedMin: Math.min(...y) - 1,
          suggestedMax: Math.max(...y) + 1,
        },
      },
    },
  };
  return config;
}

function req(lat, lon, place, hour) {
  let tmpC = [];
  let tmpF = [];
  let iconResponse = [];
  let wind = [];
  let humidity = [];
  let visibility = [];
  let event = [];
  let tmpMaxMinC = [];
  let tmpMaxMinF = [];
  let tmpHourC = [];
  let tmpHourF = [];
  let iconHour = [];
  let eventHour = [];
  let windHour = [];
  let humidityHour = [];
  let visibilityHour = [];

  $(".time-scroll").empty();
  $(".temp-hour").empty();
  $(".temp-hour-fix").empty();
  $(".event-hour").empty();
  $(".event-hour-fix").empty();

  let clearSound = ["Sunny", "Partly cloudy"];
  let windSound = [
    "Cloudy",
    "Overcast",
    "Mist",
    "Patchy snow possible",
    "Patchy sleet possible",
    "Patchy freezing drizzle possible",
    "Thundery outbreaks possible",
    "Blowing snow",
    "Blizzard",
    "Fog",
    "Freezing fog",
    "Patchy light drizzle",
    "Light drizzle",
    "Freezing drizzle",
    "Heavy freezing drizzle",
    "Patchy moderate snow",
    "Moderate snow",
    "Patchy heavy snow",
    "Heavy snow",
    "Ice pellets",
  ];
  let rainSound = [
    "Patchy rain possible",
    "Moderate rain at times",
    "Moderate rain",
    "Heavy rain at times",
    "Heavy rain",
  ];
  let stormSound = [
    "Patchy light rain",
    "Light rain",
    "Light freezing rain",
    "Moderate or heavy freezing rain",
    "Light sleet",
    "Moderate or heavy sleet",
    "Patchy light snow",
    "Light snow",
    "Light rain shower",
    "Moderate or heavy rain shower",
    "Torrential rain shower",
    "Light sleet showers",
    "Moderate or heavy sleet showers",
    "Light snow showers",
    "Moderate or heavy snow showers",
    "Light showers of ice pellets",
    "Moderate or heavy showers of ice pellets",
    "Patchy light rain with thunder",
    "Moderate or heavy rain with thunder",
    "Patchy light snow with thunder",
    "Moderate or heavy snow with thunder",
  ];

  let urlFirst =
    "https://api.weatherapi.com/v1/forecast.json?key=7ee0e3877426440b807213507210308&q=";
  let urlLast = "&days=4&aqi=no&alerts=no";
  let url = [];
  if (place !== "") {
    url = urlFirst + place + urlLast;
  } else {
    url = urlFirst + lat + "," + lon + urlLast;
  }

  $.ajax({
    url: url,
    dataType: "json",
    success: function (response) {
      var region = response.location["region"];
      for (let i = 0; i < response.forecast.forecastday.length; i++) {
        tmpC.push(
          Math.round(response.forecast.forecastday[i].hour[hour]["temp_c"])
        );
        tmpF.push(
          Math.round(response.forecast.forecastday[i].hour[hour]["temp_f"])
        );
        tmpMaxMinC.push(
          Math.round(response.forecast.forecastday[i].day["maxtemp_c"])
        );
        tmpMaxMinC.push(
          Math.round(response.forecast.forecastday[i].day["mintemp_c"])
        );
        tmpMaxMinF.push(
          Math.round(response.forecast.forecastday[i].day["maxtemp_f"])
        );
        tmpMaxMinF.push(
          Math.round(response.forecast.forecastday[i].day["mintemp_f"])
        );
        iconResponse.push(
          response.forecast.forecastday[i].hour[hour].condition.icon
        );
        event.push(response.forecast.forecastday[i].hour[hour].condition.text);
        wind.push(response.forecast.forecastday[i].hour[hour]["wind_kph"]);
        humidity.push(response.forecast.forecastday[i].hour[hour]["humidity"]);
        visibility.push(response.forecast.forecastday[i].hour[hour]["vis_km"]);

        for (let j = 0; j < response.forecast.forecastday[i].hour.length; j++) {
          tmpHourC.push(
            Math.round(response.forecast.forecastday[i].hour[j]["temp_c"])
          );
          tmpHourF.push(
            Math.round(response.forecast.forecastday[i].hour[j]["temp_f"])
          );
          eventHour.push(
            response.forecast.forecastday[i].hour[j].condition.text
          );
          iconHour.push(
            response.forecast.forecastday[i].hour[j].condition.icon
          );
          windHour.push(response.forecast.forecastday[i].hour[j]["wind_kph"]);
          humidityHour.push(
            response.forecast.forecastday[i].hour[j]["humidity"]
          );
          visibilityHour.push(
            response.forecast.forecastday[i].hour[j]["vis_km"]
          );
        }
      }

      if (place == "") {
        placeOut.text(region);
      } else {
        placeOut.text(place);
      }

      //h2.each(function (item) {
      //  console.log($(this).target);
      //  $(this).data("temp", { celsius: tmpC[item], farenheit: tmpF[item] });
      //  $(this).find(span).text($(this).data("temp").celsius);
      //  $("sub").text("C");
      //});

      temp.data("tmp", {
        celsius: [tmpHourC[hour], tmpHourC[24 + hour], tmpHourC[48 + hour]],
        farenheit: [tmpHourF[hour], tmpHourF[24 + hour], tmpHourF[48 + hour]],
      });
      temp.find(span).text(temp.data("tmp").celsius[0]);
      temp.find("sub").text("C");

      $(".temp-max-min").data("temp-max-min", {
        celsius: [
          tmpMaxMinC[0],
          tmpMaxMinC[1],
          tmpMaxMinC[2],
          tmpMaxMinC[3],
          tmpMaxMinC[4],
          tmpMaxMinC[5],
        ],
        farenheit: [
          tmpMaxMinF[0],
          tmpMaxMinF[1],
          tmpMaxMinF[2],
          tmpMaxMinF[3],
          tmpMaxMinF[4],
          tmpMaxMinF[5],
        ],
      });

      $("#icon").data("icon", {
        today: iconHour[hour],
        tomorrow: iconHour[24 + hour],
        afterTomorrow: iconHour[48 + hour],
      });
      $("#event").data("event", {
        today: eventHour[hour],
        tomorrow: eventHour[24 + hour],
        afterTomorrow: event[48 + hour],
      });
      $("#wind").data("wind", {
        today: windHour[hour],
        tomorrow: windHour[24 + hour],
        afterTomorrow: windHour[48 + hour],
      });
      $("#humidity").data("humidity", {
        today: humidityHour[hour],
        tomorrow: humidityHour[24 + hour],
        afterTomorrow: humidityHour[48 + hour],
      });
      $("#visibility").data("visibility", {
        today: visibilityHour[hour],
        tomorrow: visibilityHour[24 + hour],
        afterTomorrow: visibilityHour[48 + hour],
      });

      $(".temp-hour").data("temp-hour", {
        celsius: tmpHourC,
        farenheit: tmpHourF,
      });

      $("#icon").css(
        "background-image",
        "url(https:" + $("#icon").data("icon").today + ")"
      );
      $("#event").text($("#event").data("event").today);
      $("#wind span").text($("#wind").data("wind").today);
      $("#humidity span").text($("#humidity").data("humidity").today);
      $("#visibility span").text($("#visibility").data("visibility").today);

      $(".wind-map span").text($("#wind").data("wind").today);
      $(".humidity-map span").text($("#humidity").data("humidity").today);
      $(".visibility-map span").text($("#visibility").data("visibility").today);

      $(".temp-forecast span").text(function (item) {
        return temp.data("tmp").celsius[item];
      });
      $(".icon-forecast").attr("src", function (item) {
        return "https:" + iconHour[24 * item + hour];
      });

      $(".temp-max-min span").text(function (item) {
        return $(".temp-max-min").data("temp-max-min").celsius[item];
      });

      $(".icon-scroll").css("background-image", function (item) {
        return "url(https:" + iconHour[24 * item + hour] + ")";
      });

      $(".event-scroll").text(function (item) {
        return eventHour[24 * item + hour];
      });

      $(".humidity-hour span").text(function (item) {
        return humidityHour[24 * item + hour];
      });

      $(".visibility-hour span").text(function (item) {
        return visibilityHour[24 * item + hour];
      });

      $(".wind-hour span").text(function (item) {
        return windHour[24 * item + hour];
      });

      for (let j = hour; j < 24; j++) {
        if (j < 12) {
          $(".time-scroll").append("<p class='text-light'>" + j + ":00 AM</p>");
        } else if (j > 12){
          $(".time-scroll").append(
            "<p class='text-light'>" + (j - 12) + ":00 PM</p>"
          );
        }else{
          $(".time-scroll").append("<p class='text-light'>" + j + ":00 PM</p>");
        }

        $(".temp-hour").append(
          "<p class='text-light'>" +
            $(".temp-hour").data("temp-hour").celsius[j] +
            "<sup>o</sup></p>"
        );
        $(".event-hour").append(
          "<div><img src='https:" +
            iconHour[j] +
            "'></img><p class='text-light'>" +
            eventHour[j] +
            "</p></div>"
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
        $(".event-hour-fix").append(function (item) {
          return (
            "<div><img src='https:" +
            iconHour[(item + 1) * 24 + i] +
            "'></img><p class='text-light'>" +
            eventHour[item * 24 + i] +
            "</p></div>"
          );
        });
      }

      clearSound.forEach((item) => {
        if (item == $("#event").data("event").today) {
          $("#player").attr("src", "audio/clear.mp3");
        }
      });

      windSound.forEach((item) => {
        if (item == $("#event").data("event").today) {
          $("#player").attr("src", "audio/wind.mp3");
        }
      });

      rainSound.forEach((item) => {
        if (item == $("#event").data("event").today) {
          $("#player").attr("src", "audio/rain.mp3");
        }
      });

      stormSound.forEach((item) => {
        if (item == $("#event").data("event").today) {
          $("#player").attr("src", "audio/thunder.mp3");
        }
      });

      var ctx = $("#chart-1")[0].getContext("2d");
      var cty = $("#chart-2")[0].getContext("2d");
      var ctz = $("#chart-3")[0].getContext("2d");

      if (myChart) {
        myChart.destroy();
      }

      if (myChart2) {
        myChart2.destroy();
      }

      if (myChart3) {
        myChart3.destroy();
      }

      myChart = new Chart(
        ctx,
        chart(
          24 - hour,
          tmpHourC.slice(hour, 24),
          "Today",
          hour,
          eventHour.slice(hour, 24),
          visibilityHour.slice(hour, 24),
          windHour.slice(hour, 24),
          humidityHour.slice(hour, 24)
        )
      );

      myChart2 = new Chart(
        cty,
        chart(
          24,
          tmpHourC.slice(24, 48),
          "Tomorrow",
          0,
          eventHour.slice(24, 48),
          visibilityHour.slice(24, 48),
          windHour.slice(24, 48),
          humidityHour.slice(24, 48)
        )
      );

      myChart3 = new Chart(
        ctz,
        chart(
          24,
          tmpHourC.slice(48, 72),
          "After Tomorrow",
          0,
          eventHour.slice(48, 72),
          visibilityHour.slice(48, 72),
          windHour.slice(48, 72),
          humidityHour.slice(48, 72)
        )
      );
    },
    error: function () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Sorry. Place don't found. Please try something else!."
      })
    },
  });
}
