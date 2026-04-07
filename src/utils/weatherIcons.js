// Map OpenWeather icon codes to local Meteocons SVG files
const iconMap = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'overcast-day',
  '04n': 'overcast-night',
  '09d': 'overcast-day-rain',
  '09n': 'overcast-night-rain',
  '10d': 'partly-cloudy-day-rain',
  '10n': 'partly-cloudy-night-rain',
  '11d': 'thunderstorms',
  '11n': 'thunderstorms',
  '13d': 'partly-cloudy-day-snow',
  '13n': 'partly-cloudy-night-snow',
  '50d': 'fog-day',
  '50n': 'fog-night',
}

// Returns the local SVG path for one OpenWeather icon code
const getWeatherIconPath = (iconCode) => {
  const fileName = iconMap[iconCode] || 'cloudy'
  return `/icons/${fileName}.svg`
}

export default getWeatherIconPath
