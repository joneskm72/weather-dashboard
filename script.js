$(document).ready(function() {
  $("#search-button").on("click", function() {
    var searchValue = $("#search-value").val();
    console.log(searchValue)
    // clear input box

    searchWeather(searchValue);
  });

  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=6d3e710535507e24b7515358898b0e0d&units=imperial`,
      dataType: "json",
      success: function(data) {
        // create history link for this search
        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));
    
          makeRow(searchValue);
        }
        console.log(data)
        // clear any old content
        $("#today").empty();
        // create html content for current weather
        
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body")
        var cardTitle  = $("<h3>").addClass("card-title").text(data.name);
        var temp = Math.round(data.main.temp);
        var tempDisplay = $("<h7>").addClass("card-text").text("Temperature: " + temp);
        var humidityDisplay  = $("<h7>").addClass("card-text humidity-display").text("Humidity: " + data.main.humidity + "%");
        var windDisplay  = $("<h7>").addClass("card-text wind-display").text("Wind Speed: " + data.wind.speed + " mph");
     //   var uvDisplay  = $("<h7>").addClass("uv-display").text("UV Index: " + data.main.humidity);

        
        // merge and add to page
        $("#today").append(card.append(cardBody.append(cardTitle, tempDisplay, humidityDisplay, windDisplay)))
        // call follow-up api endpoints
        getForecast(data.coord.lat, data.coord.lon);
        getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }
  
  function getForecast(lat, lon) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6d3e710535507e24b7515358898b0e0d&units=imperial`,
      dataType: "json",
      success: function(data) {
        // overwrite any existing content with title and empty row
        $("#forecast").empty();
        console.log("***data***", data);
        // loop over all forecasts (by 3-hour increments)
        for (var i = 1; i < 6; i++) {
          // only look at forecasts around 3:00pm
          
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var timeEl = moment.unix(data.daily[i].dt);
        var icon = $("<img>");
        icon.addClass("weather-image");
        icon.attr("src", "https://openweathermap.org/img/w/" +data.daily[i].weather[0].icon+ ".png");

        var cardTitle  = $("<h3>").addClass("card-title").text(timeEl);
        $("#forecast").append(card.append(cardBody.append(cardTitle, icon)));
        }
      }
    });
  }

  function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/uvi?appid=6d3e710535507e24b7515358898b0e0d&units=imperial&lat=${lat}&lon=${lon}`,
      dataType: "json",
      success: function(data) {
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        
        // change color depending on uv value

        if (data.value < 3) {
          btn.css("backgroundColor", "#00ff00");
        } 
        else if (data.value < 6 && data.value >= 3) {
          btn.css("backgroundColor", "#ffff00");
        } 
        else if (data.value < 8 && data.value >= 6) {
          btn.css("backgroundColor", "#ffa500");
        } 
        else if (data.value < 11 && data.value >= 8) {
          btn.css("backgroundColor", "#ff0000");
        } 
        else {
          btn.css("backgroundColor", "#b30000");
        }
        
        $("#today .card-body").append(uv.append(btn));
      }
    });
  }

  // get current history, if any
  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  if (history.length > 0) {
    searchWeather(history[history.length-1]);
  }

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
});
