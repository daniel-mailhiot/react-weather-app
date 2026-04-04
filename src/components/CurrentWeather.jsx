// CurrentWeather component - receives weather data as props and displays it
function CurrentWeather({ weatherData }) {
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

  return (
    <div className='current-weather'>
      <h2>{name}</h2>
      <img src={iconUrl} alt={description} />
      <p className='temperature'>{Math.round(temp)}°C</p>
      <p className='description'>{description}</p>
      <div className='details'>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {speed} m/s</p>
      </div>
    </div>
  )
}

export default CurrentWeather
