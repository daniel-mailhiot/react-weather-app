import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'

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
  const displayTemp = unit === 'celsius' ? temp : (temp * 9 / 5) + 32
  const degreeSymbol = unit === 'celsius' ? '°C' : '°F'

  return (
    <Card elevation={3} sx={{ my: 3 }}>
      <CardContent>
        {/* City name */}
        <Typography variant='h5' align='center'>
          {name}
        </Typography>

        {/* Weather icon and temperature */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={iconUrl} alt={description} />
          <Typography variant='h3'>
            {Math.round(displayTemp)}{degreeSymbol}
          </Typography>
        </Box>

        {/* Weather description */}
        <Typography variant='subtitle1' align='center' color='text.secondary'>
          {description}
        </Typography>

        {/* Divider between description and details */}
        <Divider sx={{ my: 2 }} />

        {/* Humidity and wind speed side by side */}
        <Stack direction='row' justifyContent='space-around'>
          <Typography variant='body2' color='text.secondary'>
            Humidity: {humidity}%
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Wind Speed: {speed} m/s
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )

}

export default CurrentWeather
