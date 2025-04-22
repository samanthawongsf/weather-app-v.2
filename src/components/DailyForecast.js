import React from 'react';
import { convertTemp } from '../utils/tempConverter';

function DailyForecast({ data, isFahrenheit }) {
  // Days of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <div className="forecast-section">
      <h2>5-Day Forecast</h2>
      <div className="daily-forecast">
        {data.map((dayData, index) => {
          const date = new Date(dayData.dt * 1000);
          const dayName = days[date.getDay()];
          const maxTemp = convertTemp(dayData.temp.max, isFahrenheit);
          const minTemp = convertTemp(dayData.temp.min, isFahrenheit);
          const iconCode = dayData.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
          const description = dayData.weather[0].description;
          
          return (
            <div className="daily-item" key={index}>
              <div className="day-name">{index === 0 ? 'Today' : dayName}</div>
              <div className="daily-details">
                <img src={iconUrl} alt={description} />
                <div className="daily-temp">
                  <span className="max-temp">{maxTemp}°</span>
                  <span className="min-temp">{minTemp}°</span>
                </div>
                <div className="daily-description">{description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyForecast;