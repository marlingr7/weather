function req(place, hour, day) {
  let urlFirst =
    "https://api.weatherapi.com/v1/forecast.json?key=7ee0e3877426440b807213507210308&q=";
  let urlLast = "&days=4&aqi=no&alerts=no";
  let url = urlFirst + place + urlLast;

  $.ajax({
    url: url,
    dataType: "json",
    success: function (response) {
      $("#place").text(place);
      if(day == "Today" ){
        $("h2").text(Math.round(response.current["temp_c"])).append("o".sup());
        $("#event").text(response.current.condition.text);
        $("#icon").css("background-image", "url(" + "https:" + response.current.condition.icon + ")");
        $("#wind").text(response.current["wind_kph"] + " km/h");
        $("#humidity").text(response.current["humidity"] + " %");
        $("#visibility").text(response.current["vis_km"] + " Km");
      }else if(day == "Tomorrow"){
        $("h2").text(Math.round(response.forecast.forecastday[1].hour[hour]["temp_c"])).append("o".sup());
        $("#event").text(response.forecast.forecastday[1].hour[hour].condition.text);
        $("#icon").css("background-image", "url(" + "https:" + response.forecast.forecastday[1].hour[hour].condition.icon + ")");
        $("#wind").text(response.forecast.forecastday[1].hour[hour]["wind_kph"] + " km/h");
        $("#humidity").text(response.forecast.forecastday[1].hour[hour]["humidity"] + " %");
        $("#visibility").text(response.forecast.forecastday[1].hour[hour]["vis_km"] + " Km");
      }else{
        $("h2").text(Math.round(response.forecast.forecastday[2].hour[hour]["temp_c"])).append("o".sup());
        $("#event").text(response.forecast.forecastday[2].hour[hour].condition.text);
        $("#icon").css("background-image", "url(" + "https:" + response.forecast.forecastday[2].hour[hour].condition.icon + ")");
        $("#wind").text(response.forecast.forecastday[2].hour[hour]["wind_kph"] + " km/h");
        $("#humidity").text(response.forecast.forecastday[2].hour[hour]["humidity"] + " %");
        $("#visibility").text(response.forecast.forecastday[2].hour[hour]["vis_km"] + " Km");
      }
      
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
    error: function () {
      alert("Sorry. Place don't found. Please try something else");
    },
  });
}
