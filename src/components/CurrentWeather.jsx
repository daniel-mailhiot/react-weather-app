import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { Gauge } from '@mui/x-charts/Gauge'
import { GaugeContainer, GaugeValueArc, GaugeReferenceArc, useGaugeState } from '@mui/x-charts/Gauge'
import { LineChart } from '@mui/x-charts/LineChart'
import getWeatherIconPath from '../utils/weatherIcons'
import TempToggle from './TempToggle'

// GaugePointer component - draws a simple needle using the current gauge state
// (code from MUI docs with some adjustments:https://v7.mui.com/x/react-charts/gauge/#creating-your-components)
function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState()

  if (valueAngle === null) {
    // No value to display
    return null
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill='red' />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke='red'
        strokeWidth={3}
      />
    </g>
  )
}

// CurrentWeather component - displays current weather with expandable details and charts
function CurrentWeather({ weatherData, forecastData, unit, loading, onToggle }) {
  const [expanded, setExpanded] = useState(false) // tracks if the details panel is open

  // Show loading spinner or nothing if no data
  if (!weatherData || loading) {
    if (loading) {
      return (
        <Card elevation={3} sx={{ my: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  // Extract data needed from the weatherData object
  const { name } = weatherData // city name
  const { temp, feels_like, temp_min, temp_max, humidity, pressure } = weatherData.main
  const { speed, deg } = weatherData.wind // wind speed and direction
  const { description, icon } = weatherData.weather[0] // weather description and icon code

  // Weather icons
  const iconUrl = getWeatherIconPath(icon)

  // Convert temperature based on selected unit
  const convertTemp = (t) => unit === 'celsius' ? t : (t * 9 / 5) + 32
  const degreeSymbol = unit === 'celsius' ? '°C' : '°F'

  // Convert wind degrees to compass direction (N, NE, E, etc.)
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.round(degrees / 45) % 8]
  }

  // Prepare chart data from 5-day forecast
  const chartData = forecastData ? forecastData.map((day) => ({
    date: day.date,
    temp: Math.round(convertTemp(day.temp)),
    tempMin: Math.round(convertTemp(day.tempMin)),
    tempMax: Math.round(convertTemp(day.tempMax)),
    feelsLike: Math.round(convertTemp(day.feelsLike)),
  })) : []

  return (
    <Card elevation={3} sx={{ my: 3 }}>
      <CardContent>
        {/* City name and temperature toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Typography variant='h5'>
            {name}
          </Typography>
          <Box sx={{ position: 'absolute', right: 0 }}>
            <TempToggle unit={unit} onToggle={onToggle} />
          </Box>
        </Box>

        {/* Main content area - single row when expanded on md+, stacks on xs */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: expanded ? 'row' : 'column' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: expanded ? 3 : 0,
        }}>
          {/* Weather summary - icon, temp, description */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            {/* Weather icon and temperature */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={iconUrl}
                alt={description}
                style={{ width: '100px', height: '100px' }}
              />
              <Typography variant='h3' key={unit} sx={{ animation: 'tempFade 0.3s ease' }}>
                {Math.round(convertTemp(temp))}{degreeSymbol}
              </Typography>
            </Box>

            {/* Weather description */}
            <Typography variant='subtitle1' color='text.secondary'>
              {description}
            </Typography>
          </Box>

          {/* Expanded details panel - text stats and gauges all in one row on md+ */}
          {expanded && (
            <Box sx={{
              animation: 'fadeIn 0.5s ease',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 2, md: 4 },
              pt: { xs: 1, md: 0 },
            }}>
              {/* Text details column - feels like, high/low, wind */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant='body1' key={`feels-${unit}`} sx={{ animation: 'tempFade 0.3s ease' }}>
                  Feels like: {Math.round(convertTemp(feels_like))}{degreeSymbol}
                </Typography>
                <Typography variant='body1' key={`range-${unit}`} sx={{ animation: 'tempFade 0.3s ease' }}>
                  High: {Math.round(convertTemp(temp_max))}{degreeSymbol} / Low: {Math.round(convertTemp(temp_min))}{degreeSymbol}
                </Typography>
                <Typography variant='body1'>
                  Wind: {speed} m/s {getWindDirection(deg)}
                </Typography>
              </Box>

              {/* Gauges row - kept together as a unit so they stay side-by-side */}
              <Box sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'flex-start',
                flexShrink: 0,
              }}>
                {/* Pressure gauge - custom pointer built with useGaugeState */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='body2' color='text.secondary' gutterBottom>
                    Pressure
                  </Typography>
                  <GaugeContainer width={120} height={100} value={pressure} valueMin={960} valueMax={1060}>
                    <GaugeReferenceArc />
                    <GaugeValueArc />
                    <GaugePointer />
                  </GaugeContainer>
                  <Typography variant='body2'>{pressure} hPa</Typography>
                </Box>

                {/* Humidity gauge - text display style */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='body2' color='text.secondary' gutterBottom>
                    Humidity
                  </Typography>
                  <Gauge
                    width={120}
                    height={100}
                    value={humidity}
                    valueMin={0}
                    valueMax={100}
                    text={({ value }) => `${value}%`}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Divider between main content and charts/button */}
        <Divider sx={{ my: 2 }} />

        {/* 5-Day forecast charts - visible when expanded */}
        {expanded && chartData.length > 0 && (
          <Box sx={{ animation: 'fadeIn 0.5s ease', mb: 2 }}>
            {/* Area chart - 5-day high/low temperature range */}
            <Typography variant='subtitle2' align='center' gutterBottom>
              5-Day Temperature Range
            </Typography>
            <LineChart
              height={200}
              xAxis={[{ data: chartData.map((d) => d.date), scaleType: 'point' }]}
              series={[
                {
                  data: chartData.map((d) => d.tempMax),
                  label: `High (${degreeSymbol})`,
                  area: true,
                  color: '#ef5350',
                },
                {
                  data: chartData.map((d) => d.tempMin),
                  label: `Low (${degreeSymbol})`,
                  area: true,
                  color: '#42a5f5',
                },
              ]}
              sx={{ '.MuiAreaElement-root': { opacity: 0.3 } }}
            />

            {/* Line chart - feels like vs actual temperature */}
            <Typography variant='subtitle2' align='center' gutterBottom sx={{ mt: 2 }}>
              Feels Like vs Actual
            </Typography>
            <LineChart
              height={200}
              xAxis={[{ data: chartData.map((d) => d.date), scaleType: 'point' }]}
              series={[
                {
                  data: chartData.map((d) => d.temp),
                  label: `Actual (${degreeSymbol})`,
                  color: '#66bb6a',
                },
                {
                  data: chartData.map((d) => d.feelsLike),
                  label: `Feels Like (${degreeSymbol})`,
                  color: '#ab47bc',
                },
              ]}
            />
          </Box>
        )}

        {/* More/Less Info toggle button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='text'
            size='small'
            onClick={() => setExpanded((prev) => !prev)}
            sx={{ textTransform: 'none' }}
          >
            {expanded ? 'Less Info' : 'More Info'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CurrentWeather