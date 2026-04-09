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

    // Group all entries by date - used to calculate true daily min/max
    const dailyGroups = {}
    data.list.forEach((entry) => {
        const date = entry.dt_txt.split(' ')[0]
        if (!dailyGroups[date]) {
            dailyGroups[date] = []
        }
        dailyGroups[date].push(entry)
    })

    // Filter to one entry per day at noon - API returns data every 3 hours (https://openweathermap.org/forecast5)
    const dailyForecast = data.list.filter((entry) =>
        entry.dt_txt.includes('12:00:00')
    )

    // Map each day into a format for the Forecast and CurrentWeather components
    const formattedForecast = dailyForecast.map((day) => {
        const date = day.dt_txt.split(' ')[0]
        const entries = dailyGroups[date] || [day] // all 3-hour entries for this day

        return {
            date: new Date(day.dt_txt).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }),
            temp: day.main.temp,
            tempMin: Math.min(...entries.map((e) => e.main.temp)), // daily low from all 3-hour entries
            tempMax: Math.max(...entries.map((e) => e.main.temp)), // daily high from all 3-hour entries
            feelsLike: day.main.feels_like,
            description: day.weather[0].description,
            icon: day.weather[0].icon.replace('n', 'd') // always use day icon for forecast
        }
    })
    
    return formattedForecast

}

export { getCurrentWeather, getForecast }