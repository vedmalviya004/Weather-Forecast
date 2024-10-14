function searchWeatherScript3() {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiKey = "bb155de4c627481e8f2201934241503"; // Replace with your actual WeatherAPI.com API key
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;

  // Fetch weather data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract relevant weather data from the response
      const forecast = data.forecast.forecastday[0];
      const winds = forecast.hour.map((entry) => entry.wind_kph);
      const temperatures = forecast.hour.map((entry) => entry.temp_c); // Temperature data

      // Create chart using Chart.js
      const ctx = document.getElementById("weatherChart").getContext("2d");
      const weatherChart = new Chart(ctx, {
        type: "line", // Use a line chart
        data: {
          labels: [
            " ",
            "01 am",
            "04 am",
            "07 am",
            "01 pm",
            "04 pm",
            "07 pm",
            " ",
          ],
          datasets: [
            {
              label: "Wind Speed",
              data: winds,
              backgroundColor: "rgb(245, 245, 255)", // Set background color for the wind dataset
              borderColor: "rgb(159, 159, 207)",
              borderWidth: 3,
              fill: true, // Fill area under the line
              borderDash: [], // Remove dashes from border
              point: false, // Remove point markers
            },
            {
              label: "Temperature",
              data: temperatures,
              backgroundColor: "rgba(255, 220, 220, 0.8)", // Set background color for the temperature dataset with transparency
              borderColor: "rgb(255, 159, 159)",
              borderWidth: 3,
              fill: true, // Fill area under the line
              borderDash: [], // Remove dashes from border
              point: false, // Remove point markers
            },
          ],
        },
        options: {
          plugins: {
            datalabels: {
              align: "end",
              anchor: "end",
              offset: 2,
              display: "auto",
              formatter: (value, context) => value.toFixed(1), // Format the value as needed
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || "";
                label += ": " + tooltipItem.yLabel;
                if (tooltipItem.datasetIndex === 0) {
                  label += " km/h"; // Append km/h to wind speed
                } else {
                  label += "°C"; // Append °C to temperature
                }
                return label;
              },
            },
          },
          legend: {
            display: true, // Display the legend
          },
          scales: {
            yAxes: [
              {
                display: false, // Hide y-axis
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false, // Hide vertical gridlines
                },
              },
            ],
          },
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
