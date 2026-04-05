// API config - base URL and key for OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

// getCurrentWeather - fetches current weather data for a given city
const getCurrentWeather = async (city) => {
    const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    )

    // If the response is not ok, throw an error with the status
    if (!response.ok) {
        throw new Error(response.status)
    }

    const data = await response.json()
    return data
}

// getForecast - fetches 5-day forecast data for a given city
const getForecast = async (city) => {
    const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
        throw new Error(response.status)
    }

    const data = await response.json()
    // Filter to one entry per day - API returns data every 3 hours (https://openweathermap.org/forecast5)
    const dailyForecast = data.list.filter((entry) =>
        entry.dt_txt.includes('12:00:00')
    )

    // Map each day into a simpler format for the Forecast component
    const formattedForecast = dailyForecast.map((day) => ({
        date: new Date(day.dt_txt).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }),
        temp: day.main.temp,
        description: day.weather[0].description,
        icon: day.weather[0].icon
    }))

    return formattedForecast

}

export { getCurrentWeather, getForecast }
