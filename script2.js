async function getWeatherData2(city) {
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

function displayWeatherDetails(weatherDataa) {
  // Extract relevant data from API response

  const { sys, main, weather } = weatherDataa;
  const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const humidity = main.humidity;
  const description = weather[0].description; // Accessing weather description
  const maxTemp = main.temp_max;
  const minTemp = main.temp_min;
  const pressure = main.pressure;

  // Display weather details
  const sunriseHtml = (document.getElementById(
    "sunrise"
  ).innerHTML = `<b>${sunriseTime}</b>`);
  const sunsetHtml = (document.getElementById(
    "sunset"
  ).innerHTML = `<b>${sunsetTime}</b>`);
  const humidityHtml = (document.getElementById(
    "humidity"
  ).innerHTML = `<b>${humidity}%</b>`);
  const descriptionHtml = (document.getElementById(
    "description"
  ).innerHTML = `<b>${description}</b>`);

  const maxTempHtml = (document.getElementById(
    "max_temp"
  ).innerHTML = `${maxTemp} °C`);
  const minTempHtml = (document.getElementById(
    "min_temp"
  ).innerHTML = `${minTemp} °C`);
  const pressureHtml = (document.getElementById(
    "pressure"
  ).innerHTML = `${pressure} mb`);

  //document.getElementById('weather-info').innerHTML = sunriseHtml + '<br>' + sunsetHtml + '<br>' + humidityHtml + '<br>' + descriptionHtml + '<br>' + maxTempHtml + '<br>' + minTempHtml + '<br>' + pressureHtml;

  //displayWeather(pressure,humidity,minTemp,maxTemp,description,sunsetTime, sunriseTime);
}

async function searchWeatherScript2() {
  const cityInput = document.getElementById("city-input").value.trim();

  if (cityInput !== "") {
    const weatherDataa = await getWeatherData2(cityInput);
    displayWeatherDetails(weatherDataa);
    background_weather(); // Call the background_weather function
  } else {
    alert("Please enter a city name.");
  }
}
