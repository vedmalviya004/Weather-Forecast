async function getWeatherData1(city) {
  const apiKey = "b265cd39847c86224cf32e696b083e34";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

async function getCountryName(countryCode) {
  const apiUrl = `https://restcountries.com/v2/alpha/${countryCode}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.log("Error fetching country data:", error);
  }
}

async function displayWeather(
  cityName,
  countryName,
  temperature,
  dayName,
  period,
  iconUrl,
  currentTime
) {
  const weatherInfo = document.getElementById("weather-info");

  // Display city name, country name, temperature, day name, period, and weather icon

  const cityNameHtml = (document.getElementById(
    "city_name"
  ).innerHTML = `${cityName},`);
  const countryNameHtml = (document.getElementById(
    "country_name"
  ).innerHTML = `${countryName}`);
  const temperatureHtml = (document.getElementById(
    "left_background_box_temp"
  ).innerHTML = `<b>${temperature} °C</b>`);
  const dayNameHtml = (document.getElementById("day").innerHTML = `${dayName}`);
  const periodHtml = (document.getElementById(
    "period"
  ).innerHTML = `${period}`);
  const iconHtml = `<img class="weather-icon" src="${iconUrl}" alt="Weather Icon">`;

  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert hours to 12-hour format
  const currentTimeHtml = (document.getElementById(
    "time"
  ).innerHTML = `<b>${hours}:${minutes < 10 ? "0" : ""}${minutes} ${amPm}</b>`);

  // weatherInfo.innerHTML = cityNameHtml + countryNameHtml + temperatureHtml + dayNameHtml + periodHtml + iconHtml + currentTimeHtml;

  // Change background image based on the period
  let backgroundImageUrl;
  if (period === "Night") {
    backgroundImageUrl = "Bg-Color/night.jpg";
  } else if (period === "Morning") {
    backgroundImageUrl = "Bg-Color/morning.jpg";
  } else {
    backgroundImageUrl = "Bg-Color/Evening.jpg";
  }
  document.getElementById(
    "weather-inform"
  ).style.backgroundImage = `url("${backgroundImageUrl}")`;
}

async function searchWeatherScript1() {
  const cityInput = document.getElementById("city-input").value.trim();

  if (cityInput !== "") {
    const weatherData = await getWeatherData1(cityInput);
    const countryName = await getCountryName(weatherData.sys.country);
    const { name, main, weather } = weatherData;
    const cityName = name;
    const temperature = main.temp;
    const currentTime = new Date();
    const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
    const sunsetTime = new Date(weatherData.sys.sunset * 1000);

    let period;
    if (currentTime < sunriseTime) {
      period = "Night";
    } else if (currentTime < sunsetTime) {
      period = "Morning";
    } else {
      period = "Evening";
    }

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[currentTime.getDay()];

    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    displayWeather(
      cityName,
      countryName,
      temperature,
      dayName,
      period,
      iconUrl,
      currentTime
    );
  } else {
    alert("Please enter a city name.");
  }
}
