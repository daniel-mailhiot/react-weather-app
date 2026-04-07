import { useState, useMemo } from 'react'
import './App.css'
import { ThemeProvider, CssBaseline, Container, Typography } from '@mui/material'
import getTheme from './styles/theme'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import TempToggle from './components/TempToggle'
import ErrorMessage from './components/ErrorMessage'
import ThemeToggle from './components/ThemeToggle'
import { getCurrentWeather, getForecast } from './services/weatherService'


function App() {
  // States
  const [weatherData, setWeatherData] = useState(null) // stores current weather data from the API
  const [forecastData, setForecastData] = useState(null) // stores 5-day forecast data from the API
  const [unit, setUnit] = useState('celsius') // tracks the selected temperature unit
  const [error, setError] = useState(null) // stores error messages to display
  const [loading, setLoading] = useState(false) // tracks if data is being fetched

  // Dark mode state to track if the app is in dark/light mode
  const [darkMode, setDarkMode] = useState(false)

  // MUI theme - rebuilds only when darkMode changes
  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode])

  // Called when user clicks the ThemeToggle button
  const handleThemeToggle = () => setDarkMode(prev => !prev)

  // Called when user submits a city in SearchBar
  const handleSearch = async (city) => {
    // (for testing) console.log('User searched for:', city)

    // Check for empty input first
    if (!city.trim()) {
      setError('Please enter a city name.')
      return
    }

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
      // 404 message error handling
      if (err.message === '404') {
        setError('City not found. Please check the spelling.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    }

    setLoading(false) // done loading
  }

  // Called when user clicks the TempToggle button
  const handleToggle = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* MUI CSS reset - normalizes styles and applies theme background */}
      <Container maxWidth='md' sx={{ py: 4, position: 'relative' }}> {/* Centered container with vertical padding */}
        <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />
        <Typography variant='h4' component='h1' align='center' gutterBottom>
          Weather App
        </Typography>
        <TempToggle unit={unit} onToggle={handleToggle} />
        <SearchBar onSearch={handleSearch} />
        <ErrorMessage message={error} />
        {loading && <p className='loading'>Loading...</p>}
        <CurrentWeather weatherData={weatherData} unit={unit} />
        <Forecast forecastData={forecastData} unit={unit} />
      </Container>
    </ThemeProvider>
  )
}

export default App
