#Weather Dashboard

A weather dashboard that will run in the browser and feature dynamically updated HTML, JavaScript, and CSS. Uses the OpenWeather API to retrieve weather data for cities. The documentation includes a section called "How to start" that provides basic setup and usage instructions. Uses localStorage to store any persistent data.

Technologies used: HTML, JavaScript, CSS, JQuery

User Story:

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria:

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast

<img src="assets/weather-dashboard.png" width="400">

Deployed application: https://joneskm72.github.io/server-side-apis-hw6/

Contact: jones.m.kasey@gmail.com

License: MIT