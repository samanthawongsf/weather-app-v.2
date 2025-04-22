import React from 'react';

function TempUnitToggle({ isFahrenheit, onToggle }) {
  return (
    <div className="temp-toggle">
      <span className={!isFahrenheit ? 'active-unit' : ''}>°C</span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isFahrenheit}
          onChange={onToggle}
        />
        <span className="slider"></span>
      </label>
      <span className={isFahrenheit ? 'active-unit' : ''}>°F</span>
    </div>
  );
}

export default TempUnitToggle;