import './App.css'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import TempToggle from './components/TempToggle'


function App() {
  // Callback function sent to SearchBar, triggered when user submits a city
  const handleSearch = (city) => {
    console.log('User searched for:', city)
  }

  return (
    <div className='App'>
      <h1>Weather App</h1>
      {/* Toggle button - switches between Celsius and Fahrenheit */}
      <TempToggle unit='celsius' onToggle={() => console.log('Toggle clicked')} />
      {/* Send handleSearch so SearchBar can send the city name back here */}
      <SearchBar onSearch={handleSearch} />
      {/* Send weather data to CurrentWeather (null for now until API is connected) */}
      <CurrentWeather weatherData={null} />
      {/* Send forecast data to Forecast (null for now until API is connected) */}
      <Forecast forecastData={null} />
    </div>
  )
}

export default App
