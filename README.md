# Modern Weather App

A full-featured React weather application that provides current weather conditions, hourly forecast, and 5-day forecast.

## Features

- **Current Weather Information**: Temperature, humidity, wind speed, pressure, and more
- **Hourly Forecast**: 24-hour weather forecast with 3-hour intervals
- **5-Day Forecast**: Extended weather outlook for the next 5 days
- **Location-Based Weather**: Get weather for your current location with one click
- **City Search**: Search for weather information by city name
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Error Handling**: User-friendly error messages for various scenarios
- **Loading States**: Visual feedback while data is being fetched

## Technologies Used

- **React**: UI library for building component-based interfaces
- **OpenWeatherMap API**: Weather data source (free tier)
- **CSS**: Custom styling with responsive design
- **Geolocation API**: Browser API for obtaining user's location

## Installation and Setup

1. Clone this repository:
```bash
git clone https://github.com/samanthawongsf/weather-app-v.2.git
cd weather-app-v.2
```
3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
weather-app-v.2/
├── public/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.js
│   │   ├── DailyForecast.js
│   │   ├── ErrorMessage.js
│   │   ├── HourlyForecast.js
│   │   ├── LoadingSpinner.js
│   │   ├── SearchBar.js
│   │   └── TempUnitToggle.js
│   ├── utils/
│   │   └── tempConverter.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```
## API Endpoints Used

- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-day/3-hour Forecast: `https://api.openweathermap.org/data/2.5/forecast`

## How to Use

1. **Search for a City**: Enter a city name in the search bar and click "Search"
2. **Use Current Location**: Click the "My Location" button to get weather for your current location
3. **Switch Temperature Units**: Toggle between Celsius and Fahrenheit using the temperature switch
4. **View Hourly Forecast**: Scroll horizontally through the hourly forecast section
5. **View 5-Day Forecast**: Check the daily forecast section for the next 5 days

## Future Enhancements

- Weather alerts and notifications
- Weather maps with radar data
- Air quality information
- UV index with safety recommendations
- Weather-based recommendations (clothing, activities)
- Dark/light theme toggle
- Unit selection for wind speed and pressure
- Weather widget for embedding in other applications

## Troubleshooting

- **Location Access Denied**: If you deny location access, the app will prompt you to search for a city instead
- **City Not Found**: Double-check the spelling of the city name
- **API Limits**: The app uses free tier API endpoints with limited requests per minute/day

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

