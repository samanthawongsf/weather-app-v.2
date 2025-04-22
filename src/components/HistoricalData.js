import React, { useState } from 'react';
import { convertTemp } from '../utils/tempConverter';

function HistoricalData({ data, isFahrenheit }) {
  const [expanded, setExpanded] = useState(false);
  
  // Format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="forecast-section">
      <h2 onClick={() => setExpanded(!expanded)} className="collapsible-header">
        Historical Weather Data <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
      </h2>
      
      {expanded && (
        <div className="historical-data">
          {data.map((dayData, index) => {
            const date = formatDate(dayData.current.dt);
            const temperature = convertTemp(dayData.current.temp, isFahrenheit);
            const description = dayData.current.weather[0].description;
            const iconCode = dayData.current.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            
            return (
              <div className="historical-item" key={index}>
                <div className="historical-date">{date}</div>
                <div className="historical-details">
                  <img src={iconUrl} alt={description} />
                  <span className="historical-temp">{temperature}°{isFahrenheit ? 'F' : 'C'}</span>
                  <span className="historical-description">{description}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoricalData;