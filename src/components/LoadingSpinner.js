import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading weather data...</p>
    </div>
  );
}

export default LoadingSpinner;