// Modified to use free tier API endpoints
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import TempUnitToggle from './components/TempUnitToggle';

function App() {
  // State variables
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [userCoords, setUserCoords] = useState(null);

  const API_KEY = 'f9fe1a574e2792d51fa92b035382ef81';

  // Function to get user's location
  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ lat: latitude, lon: longitude });
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          setLoading(false);
          setError({
            type: 'location',
            message: `Unable to get your location: ${err.message}. Please search for a city instead.`
          });
        }
      );
    } else {
      setLoading(false);
      setError({
        type: 'location',
        message: 'Geolocation is not supported by your browser. Please search for a city instead.'
      });
    }
  };

  // Fetch weather data by coordinates - UPDATED TO USE FREE TIER ENDPOINTS
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      // Current weather - This API endpoint is free
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      if (!currentWeatherResponse.ok) {
        throw new Error(`Weather data not available (${currentWeatherResponse.status})`);
      }
      
      const currentData = await currentWeatherResponse.json();
      setCurrentWeather(currentData);
      setCity(currentData.name);

      // 5-day/3-hour forecast API (free tier) instead of One Call API
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error(`Forecast data not available (${forecastResponse.status})`);
      }
      
      const forecastData = await forecastResponse.json();
      
      // Process the forecast data
      processHourlyForecast(forecastData.list);
      processDailyForecast(forecastData.list);
      
      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError({
        type: 'api',
        message: `Error fetching weather data: ${err.message}`
      });
    }
  };

  // Fetch weather by city name - UPDATED TO USE FREE TIER ENDPOINTS
  const fetchWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      // Current weather - This API endpoint is free
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      
      if (!currentWeatherResponse.ok) {
        if (currentWeatherResponse.status === 404) {
          throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
        } else {
          throw new Error(`Weather data not available (${currentWeatherResponse.status})`);
        }
      }
      
      const currentData = await currentWeatherResponse.json();
      setCurrentWeather(currentData);
      setCity(currentData.name);

      // Get coordinates from current weather response
      const { lat, lon } = currentData.coord;
      setUserCoords({ lat, lon });

      // 5-day/3-hour forecast API (free tier) instead of One Call API
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error(`Forecast data not available (${forecastResponse.status})`);
      }
      
      const forecastData = await forecastResponse.json();
      
      // Process the forecast data
      processHourlyForecast(forecastData.list);
      processDailyForecast(forecastData.list);
      
      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError({
        type: 'api',
        message: `Error fetching weather data: ${err.message}`
      });
    }
  };

  // Process hourly forecast from the free tier API
  const processHourlyForecast = (forecastList) => {
    // Get the next 24 hours (8 items, as each is 3 hours apart)
    const next24Hours = forecastList.slice(0, 8);
    
    // Format data to match the structure expected by HourlyForecast component
    const formattedHourlyData = next24Hours.map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather
    }));
    
    setHourlyForecast(formattedHourlyData);
  };

  // Process daily forecast from the free tier API
  const processDailyForecast = (forecastList) => {
    // Group forecasts by day
    const dailyData = {};
    const days = [];
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toDateString();
      
      if (!dailyData[day]) {
        dailyData[day] = {
          dt: date.getTime() / 1000,
          temp: { min: item.main.temp_min, max: item.main.temp_max },
          weather: [item.weather[0]]
        };
        days.push(day);
      } else {
        // Update min/max temperature
        if (item.main.temp_min < dailyData[day].temp.min) {
          dailyData[day].temp.min = item.main.temp_min;
        }
        if (item.main.temp_max > dailyData[day].temp.max) {
          dailyData[day].temp.max = item.main.temp_max;
        }
      }
    });
    
    // Get 5 days of forecasts
    const formattedDailyData = days.slice(0, 5).map(day => dailyData[day]);
    setDailyForecast(formattedDailyData);
  };

  // Toggle temperature unit
  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  // Handle city search
  const handleCitySearch = (cityName) => {
    if (cityName.trim() === '') {
      setError({
        type: 'input',
        message: 'Please enter a city name.'
      });
      return;
    }
    
    setCity(cityName);
    fetchWeatherByCity(cityName);
  };

  // Load user location on initial component mount
  useEffect(() => {
    getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <div className="weather-container">
        <h1>Weather App</h1>
        
        <SearchBar 
          onSearch={handleCitySearch} 
          onLocationRequest={getUserLocation} 
        />
        
        <TempUnitToggle 
          isFahrenheit={isFahrenheit} 
          onToggle={toggleTemperatureUnit} 
        />
        
        {error && <ErrorMessage error={error} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {currentWeather && (
              <CurrentWeather 
                data={currentWeather} 
                isFahrenheit={isFahrenheit} 
              />
            )}
            
            {hourlyForecast && (
              <HourlyForecast 
                data={hourlyForecast} 
                isFahrenheit={isFahrenheit} 
              />
            )}
            
            {dailyForecast && (
              <DailyForecast 
                data={dailyForecast} 
                isFahrenheit={isFahrenheit} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;