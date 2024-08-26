import React from "react";

function Weather({ weather, unit }) {
  const { name, main, wind, weather: weatherInfo } = weather;

  // Function to convert Celsius to Fahrenheit
  const Fahrenheit = (temp) => (temp * 9) / 5 + 32;

  const temperature = unit === "metric" ? main.temp : Fahrenheit(main.temp);
  const tempMin =
    unit === "metric" ? main.temp_min : Fahrenheit(main.temp_min);
  const tempMax =
    unit === "metric" ? main.temp_max : Fahrenheit(main.temp_max);
  const temperatureUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img
        className="weathericon"
        src={`https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`}
        alt={weatherInfo[0].description}
      />
      <p className="desc">{weatherInfo[0].description}</p>

      <hr />
      <p>
        <strong>Temperature: </strong>
        {Math.round(temperature)} {temperatureUnit}
      </p>
      <p>
        <strong>Min: </strong>
        {Math.round(tempMin)} {temperatureUnit} | <strong>Max: </strong>
        {Math.round(tempMax)} {temperatureUnit}
      </p>
      <p>
        <strong>Humidity: </strong>
        {main.humidity}%
      </p>
      <p>
        <strong>Wind: </strong>
        {wind.speed} m/s at {wind.deg}°
      </p>
    </div>
  );
}

export default Weather;


