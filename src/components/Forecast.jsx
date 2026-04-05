// Forecast component - receives an array of forecast data and displays a card for each day
function Forecast({ forecastData, unit }) {
  // If no data is passed, don't render anything
  if (!forecastData) {
    return null
  }

  // Convert temperature to Fahrenheit if needed
  const convertTemp = (temp) => {
    return unit === 'celsius' ? temp : (temp * 9/5) + 32
  }
  const degreeSymbol = unit === 'celsius' ? '°C' : '°F'

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
            <p className='forecast-temp'>{Math.round(convertTemp(day.temp))}{degreeSymbol}</p>
            <p className='forecast-description'>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
