// Forecast component - receives an array of forecast data and displays a card for each day
function Forecast({ forecastData }) {
  // If no data is passed, don't render anything
  if (!forecastData) {
    return null
  }

  return (
    <div className='forecast'>
      <h3>5-Day Forecast</h3>
      <div className='forecast-cards'>
        {forecastData.map((day, index) => (
          <div key={index} className='forecast-card'>
            <p className='forecast-date'>{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            />
            <p className='forecast-temp'>{Math.round(day.temp)}°C</p>
            <p className='forecast-description'>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
