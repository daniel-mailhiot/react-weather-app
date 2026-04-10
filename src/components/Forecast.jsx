import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import getWeatherIconPath from '../utils/weatherIcons'

// Forecast component - receives an array of forecast data and displays a card for each day
function Forecast({ forecastData, unit }) {
  // Tracks which cards are flipped to high/low view - keys are card indexes, value true means showing high/low
  const [highLowCards, setHighLowCards] = useState({})

  // If no data is passed, don't render anything
  if (!forecastData) {
    return null
  }

  // Toggle high/low view for a single card by its index
  const toggleHighLow = (index) => {
    setHighLowCards((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  // Convert temperature to Fahrenheit if needed
  const convertTemp = (temp) => {
    return unit === 'celsius' ? temp : (temp * 9 / 5) + 32
  }
  const degreeSymbol = unit === 'celsius' ? '°C' : '°F'

  return (
    <Box sx={{ my: 3 }}>
      {/* Section heading */}
      <Typography variant='h6' align='center' gutterBottom>
        5-Day Forecast
      </Typography>

      {/* Forecast cards container - wraps responsively */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {forecastData.map((day, index) => (
          <Card
            key={index}
            elevation={2}
            onClick={() => toggleHighLow(index)}
            sx={{ flex: '1 1 150px', maxWidth: 180, cursor: 'pointer' }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              {/* Date */}
              <Typography variant='subtitle2'>
                {day.date}
              </Typography>

              {/* Weather icon */}
              <img
                src={getWeatherIconPath(day.icon)}
                alt={day.description}
                style={{ width: '64px', height: '64px' }}
              />

              {/* Temperature - toggles between current temp and high/low on card click */}
              {/* key includes unit and toggle state so the fade animation retriggers on both changes */}
              <Typography variant='h6' key={`${unit}-${!!highLowCards[index]}`} sx={{ animation: 'tempFade 0.3s ease' }}>
                {highLowCards[index]
                  ? `${Math.round(convertTemp(day.tempMax))}${degreeSymbol} - ${Math.round(convertTemp(day.tempMin))}${degreeSymbol}`
                  : `${Math.round(convertTemp(day.temp))}${degreeSymbol}`}
              </Typography>

              {/* Description */}
              <Typography variant='body2' color='text.secondary'>
                {day.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )

}

export default Forecast
