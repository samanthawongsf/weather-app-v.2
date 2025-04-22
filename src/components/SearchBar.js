import React, { useState } from 'react';

function SearchBar({ onSearch, onLocationRequest }) {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(cityInput);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="search-button">Search</button>
          <button 
            type="button"
            className="location-button"
            onClick={onLocationRequest}
          >
            <span className="location-icon">📍</span> My Location
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;