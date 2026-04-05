import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import TempToggle from './components/TempToggle'
import ErrorMessage from './components/ErrorMessage'
import { getCurrentWeather, getForecast } from './services/weatherService'


function App() {
  // States
  const [weatherData, setWeatherData] = useState(null) // stores current weather data from the API
  const [forecastData, setForecastData] = useState(null) // stores 5-day forecast data from the API
  const [unit, setUnit] = useState('celsius') // tracks the selected temperature unit
  const [error, setError] = useState(null) // stores error messages to display
  const [loading, setLoading] = useState(false) // tracks if data is being fetched

  // Called when user submits a city in SearchBar
  const handleSearch = async (city) => {
    // for testing: console.log('User searched for:', city)

    // Clear any previous error and start loading
    setError(null)
    setLoading(true)

    try {
      // Fetch current weather and forecast data at the same time
      const weather = await getCurrentWeather(city)
      const forecast = await getForecast(city)

      setWeatherData(weather) // store current weather data in state
      setForecastData(forecast) // store formatted forecast data in state
    } catch (err) {
      // If something goes wrong, store the error message
      setError('Something went wrong. Please try again.')
    }

    setLoading(false) // done loading
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
      <CurrentWeather weatherData={weatherData} unit={unit}/> {/* Current weather data */}
      <Forecast forecastData={forecastData} unit={unit}/> {/* 5-day forecast data */}
    </div>
  )
}

export default App
