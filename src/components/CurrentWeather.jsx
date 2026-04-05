// CurrentWeather component - receives weather data as props and displays it
function CurrentWeather({ weatherData, unit }) {
  // If no data is passed, don't render anything
  if (!weatherData) {
    return null
  }

  // Extract data needed from the weatherData object
  const { name } = weatherData // city name
  const { temp, humidity } = weatherData.main // temperature and humidity
  const { speed } = weatherData.wind // wind speed
  const { description, icon } = weatherData.weather[0] // weather description and icon code

  // Weather icon URL from OpenWeatherMap
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  // Convert temperature to Fahrenheit if needed
  const displayTemp = unit === 'celsius' ? temp : (temp * 9/5) + 32
  const degreeSymbol = unit === 'celsius' ? '°C' : '°F'

  return (
    <div className='current-weather'>
      <h2>{name}</h2>
      <img src={iconUrl} alt={description}/>
      <p className='temperature'>{Math.round(displayTemp)}{degreeSymbol}</p>
      <p className='description'>{description}</p>
      <div className='details'>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {speed} m/s</p>
      </div>
    </div>
  )
}

export default CurrentWeather
