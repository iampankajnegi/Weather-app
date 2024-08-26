import axios from "axios";
import React, { useEffect, useState } from "react";
import Weather from "./componenets/weather";
import ForecastCard from "./componenets/forecast";
import loader from "./images/WeatherIcons.gif";
import search from "./images/search-interface-symbol.png";

import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null); // Reset any existing errors
      const Api_Key = "14ba427531b486fdb781ae6784cc0c79";

      let weatherResponse;
      if (latitude && longitude) {
        // Fetch weather based on location
        weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${Api_Key}`
        );
        setCity(weatherResponse.data.name); // Update city name based on location
      } else if (city) {
        // Fetch weather based on city name
        weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${Api_Key}`
        );
      } else {
        throw new Error("Please enter a city name."); // Error for empty city input
      }

      setWeather(weatherResponse.data);

      // forecast api
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&units=${unit}&appid=${Api_Key}`
      );

      setForecast(forecastResponse.data);
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "City not found. Please try again."
      );
      setLoading(false);
      setWeather(null);
      setForecast(null);
    }
  };

  const searching = () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
    } else {
      getWeather();
      setLoading(false);
      setCity("");
    }
  };

  useEffect(() => {
    const fetchLocation = () => {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        });
      } else {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const toggle = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <img src={loader} alt="" className="loading" />
          <h3>Detecting your location</h3>
          <h3 style={{ color: "black", marginTop: "10px" }}>
            Your current location will be displayed on the App <br /> & used for
            calculating real-time weather.
          </h3>
        </div>
      ) : (
        <div className="weatherCard">
          <div className="leftSide">
            <input
              className="inputName"
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={searching}>
              <img src={search} alt="Search" className="search" />
            </button>
            <button className="degree" onClick={toggle}>
              {unit === "metric" ? "Show in °F" : "Show in °C"}
            </button>

            {error && <div className="error">{error}</div>}

            {weather && <Weather weather={weather} unit={unit} />}
          </div>

          <div className="rightSide">
            {forecast && <ForecastCard forecast={forecast} unit={unit} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
