import React from "react";

function ForecastCard({ forecast, unit }) {
  
  // convert C | F temp.
  const Fahrenheit = (temp) => (temp * 9) / 5 + 32;
  const temperatureUnit = unit === "metric" ? "°C" : "°F";

  // use Date and Week  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="forecast-card">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
      {/*  map a forecast data*/}
        {forecast.list.map((item, index) => {
          if (index % 8 === 0) {
            const temp =
              unit === "metric" ? item.main.temp : Fahrenheit(item.main.temp);
            return (
              <div key={index} className="forecast-item">
                <p>{formatDate(item.dt_txt)}</p>
                  
                  {/* icons  */}
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                />
                <p>{item.weather[0].description}</p>
                <p>
                  {Math.round(temp)} {temperatureUnit}
                </p>

                <p></p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default ForecastCard;
