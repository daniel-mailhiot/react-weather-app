import { useState, useEffect, useMemo } from 'react'
import logo from './assets/logo.svg'
import './App.css'
import { ThemeProvider, CssBaseline, Container, Typography, Box, CircularProgress } from '@mui/material'
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

  // Fetch weather for a default city when the app first loads
  useEffect(() => {
    handleSearch('Toronto')
  }, [])

  // Update the browser tab title when weather data changes
  useEffect(() => {
    if (weatherData) {
      document.title = `Weather - ${weatherData.name}`
    } else {
      document.title = 'Weather App'
    }
  }, [weatherData])

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

  // Called when user clicks a TempToggle button, newUnit comes from MUI ToggleButtonGroup
  const handleToggle = (event, newUnit) => {
    if (newUnit !== null) setUnit(newUnit)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* MUI CSS reset - normalizes styles and applies theme background */}
      <Container maxWidth='md' sx={{ py: 4 }}>
        {/* Header - title on the left, toggles on the right */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={logo} alt='Weather App logo' style={{ height: '2.5rem' }} />
            <Typography variant='h4' component='h1'>
              Weather App
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TempToggle unit={unit} onToggle={handleToggle} />
            <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />
          </Box>
        </Box>
        <SearchBar onSearch={handleSearch} />
        <ErrorMessage message={error} />
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        <CurrentWeather key={weatherData?.name} weatherData={weatherData} unit={unit} /> {/* key triggers fade-in animation on city change so animation plays every time*/}
        <Forecast key={weatherData?.name + '-forecast'} forecastData={forecastData} unit={unit} />
      </Container>
    </ThemeProvider>
  )
}

export default App
