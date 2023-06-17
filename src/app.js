// Day and Time
let now = new Date();

let h7 = document.querySelector("#time");

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekday[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h7.innerHTML = `${day} ${hour}:${minutes}`;

// Search engine / default city
function showTemp(response) {
  fahrenheitTemperature = response.data.main.temp;

  let temperature = Math.round(fahrenheitTemperature);
  let iconElement = document.querySelector("#weather-icon");
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("h1").innerHTML = `${temperature}°`;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //console.log(response.data);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  citySearch(city);
}

function citySearch(city) {
  let units = "imperial";
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

let search = document.querySelector("form");
search.addEventListener("submit", submitCity);

// Current location button feature

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function searchCurrentLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "imperial";
  apiKey = "8161b4309ee03faae957729ba7104797";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

let currentLocationButton = document.querySelector(".current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Unit conversion

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".main-temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemperature) + "°";
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".main-temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemperature) + "°";
}

let fahrenheitTemperature = null;

let showFahrenheit = document.querySelector(".fahrenheit");
showFahrenheit.addEventListener("click", displayFahrenheit);

let showCelsius = document.querySelector(".celsius");
showCelsius.addEventListener("click", displayCelsius);

console.log(fahrenheitTemperature);

//default city
citySearch("Dallas");
