// Day and Time
let now = new Date();

let h6 = document.querySelector("#time");

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

h6.innerHTML = `${day} ${hour}:${minutes}`;

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "34ae1065362d42545661451bda2b8a1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(forecastDisplay);

  console.log(apiUrl);
}

function forecastDisplay(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <span class="forecast-weekday"> ${formatDay(forecastDay.dt)} </span>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="weather-icon"
          width="55"
        />
        <div class="forecast-temps">
          <span class="forecast-temp-min"> ${Math.round(
            forecastDay.temp.min
          )}°</span>
          <span class="forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
        </div> 
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Search engine / default city
function showTemp(response) {
  fahrenheitTemperature = response.data.main.temp;

  let temperature = Math.round(fahrenheitTemperature);
  let iconElement = document.querySelector("#weather-icon");
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("h1").innerHTML = `${temperature}°`;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

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
  showFahrenheit.classList.add("active");
  showCelsius.classList.remove("active");
  let tempElement = document.querySelector(".main-temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemperature) + "°";
}

function displayCelsius(event) {
  event.preventDefault();
  showCelsius.classList.add("active");
  showFahrenheit.classList.remove("active");
  let tempElement = document.querySelector(".main-temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemperature) + "°";
}

let fahrenheitTemperature = null;

let showFahrenheit = document.querySelector("#fahrenheit-link");
showFahrenheit.addEventListener("click", displayFahrenheit);

let showCelsius = document.querySelector("#celsius-link");
showCelsius.addEventListener("click", displayCelsius);

//default city
citySearch("Dallas");
