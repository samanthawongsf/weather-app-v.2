import React from 'react';
import { convertTemp } from '../utils/tempConverter';

function CurrentWeather({ data, isFahrenheit }) {
  const temperature = convertTemp(data.main.temp, isFahrenheit);
  const feels_like = convertTemp(data.main.feels_like, isFahrenheit);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure;
  
  return (
    <div className="current-weather">
      <div className="city-name">{data.name}, {data.sys.country}</div>
      <div className="weather-main">
        <img src={iconUrl} alt={description} className="weather-icon" />
        <div className="temp-container">
          <div className="current-temp">{temperature}°{isFahrenheit ? 'F' : 'C'}</div>
          <div className="weather-description">{description}</div>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels Like:</span>
          <span className="detail-value">{feels_like}°{isFahrenheit ? 'F' : 'C'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind:</span>
          <span className="detail-value">{windSpeed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure:</span>
          <span className="detail-value">{pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;