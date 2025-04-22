import React from 'react';
import { convertTemp } from '../utils/tempConverter';

function HourlyForecast({ data, isFahrenheit }) {
  return (
    <div className="forecast-section">
      <h2>24-Hour Forecast</h2>
      <div className="hourly-forecast">
        {data.map((hourData, index) => {
          const dateTime = new Date(hourData.dt * 1000);
          const hour = dateTime.getHours();
          const temperature = convertTemp(hourData.temp, isFahrenheit);
          const iconCode = hourData.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
          
          return (
            <div className="hourly-item" key={index}>
              <span className="hour">{hour}:00</span>
              <img src={iconUrl} alt="Hourly Weather Icon" />
              <span className="temp">{temperature}°{isFahrenheit ? 'F' : 'C'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;