import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import TempToggle from './components/TempToggle'
import ErrorMessage from './components/ErrorMessage'


function App() {
  // States
  const [weatherData, setWeatherData] = useState(null) // stores current weather data from the API
  const [forecastData, setForecastData] = useState(null) // stores 5-day forecast data from the API
  const [unit, setUnit] = useState('celsius') // tracks the selected temperature unit
  const [error, setError] = useState(null) // stores error messages to display
  const [loading, setLoading] = useState(false) // tracks if data is being fetched

  // Called when user submits a city in SearchBar
  const handleSearch = (city) => {
    console.log('User searched for:', city)
    // clear any previous error when starting a new search
    setError(null)
  }

  // Called when user clicks the TempToggle button
  const handleToggle = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')
  }

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <TempToggle unit={unit} onToggle={handleToggle}/> {/* Toggle button switches between Celsius and Fahrenheit */}
      <SearchBar onSearch={handleSearch}/> {/* Search bar sends city name back via handleSearch */}
      <ErrorMessage message={error}/> {/* Show error message if there is one */}
      {loading && <p className='loading'>Loading...</p>} {/* Display loading text while fetching data */}
      <CurrentWeather weatherData={weatherData}/> {/* Current weather data */}
      <Forecast forecastData={forecastData}/> {/* 5-day forecast data */}
    </div>
  )
}

export default App
