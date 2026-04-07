import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import getWeatherIconPath from '../utils/weatherIcons'

// Forecast component - receives an array of forecast data and displays a card for each day
function Forecast({ forecastData, unit }) {
  // If no data is passed, don't render anything
  if (!forecastData) {
    return null
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
          <Card key={index} elevation={2} sx={{ flex: '1 1 150px', maxWidth: 180 }}>
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

              {/* Temperature */}
              <Typography variant='h6' key={unit} sx={{ animation: 'tempFade 0.3s ease' }}> {/* key re-mounts on unit change to retrigger fade animation */}
                {Math.round(convertTemp(day.temp))}{degreeSymbol}
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
