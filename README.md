# React Weather App
A weather app that uses the OpenWeatherMap API to fetch current conditions and a 5-day forecast for any city. The main weather card expands to reveal detailed stats, pressure and humidity gauges, and line charts visualizing weather forecast data. State is managed with React hooks, the UI is built with Material UI, and MUI X Charts renders the data visualizations.

## Features
- **Search any city** to fetch current weather and forecast data from OpenWeatherMap API
- **Main weather overview card** with temperature, current conditions, and animated SVG icons using Meteocons by Bas Milius
- **Expanded weather view** with extra details including feels-like temperature, daily high/low, wind speed and direction
- **Interactive charts and gauges** using MUI X Charts for weather data visualization featuring:
  - **5-Day Temperature Range:** `LineChart` with two area-filled series showing daily highs and lows for the 5 day forecast
  - **Feels Like vs Actual:** `LineChart` comparing actual and perceived temperatures
  - **Pressure gauge:** Made using `GaugeContainer` and a custom SVG needle using the `useGaugeState` hook
  - **Humidity gauge:** Built with MUI X's ready-made `Gauge` component
- **5-day forecast** with daily conditions, animated icons, and temperature summaries
    - **Toggle forecast cards** between the daily temperature and high/low values on click
- **Celsius/Fahrenheit toggle** that updates the current weather, forecast cards, and charts (converted client-side, no refetch)
- **Light/dark theme toggle** with animated transitions
- **Responsive design** that adapts to mobile, tablet, and desktop layouts
- **Error handling** for empty input, invalid city names, and failed API requests

## Tech Stack
- **[React](https://react.dev/)**
- **[Vite](https://vite.dev/)**
- **[Material UI](https://mui.com/)**
- **[MUI X Charts](https://mui.com/x/react-charts/)**
- **[OpenWeatherMap API](https://openweathermap.org/api)**

## Project Structure
```
react-weather-app/
├── public/
│   ├── icons/ (weather condition SVGs)
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Forecast.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TempToggle.jsx
│   │   └── ThemeToggle.jsx
│   ├── services/
│   │   └── weatherService.js
│   ├── styles/
│   │   └── theme.js
│   ├── utils/
│   │   └── weatherIcons.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

### Folder Overview
- **`src/components/`** - UI components (`SearchBar`, `CurrentWeather`, `Forecast`, `ErrorMessage`, `TempToggle`, `ThemeToggle`)
- **`src/services/`** - API layer that wraps all OpenWeatherMap requests
- **`src/styles/`** - MUI theme definition for light and dark modes
- **`src/utils/`** - helpers, including a map from OpenWeatherMap icon codes to local icon paths
- **`src/assets/`** - static assets
- **`src/App.jsx`** - top-level component that owns state and manages the rest of the app

## Getting Started (Local Setup)

### 1) Prerequisites

- Node.js
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### 2) Install dependencies

Run: `npm install`

### 3) Configure environment variables

Create a `.env` file in the project root with:

```env
# OpenWeatherMap API key - must be prefixed with VITE_ to be exposed to the client
VITE_WEATHER_API_KEY=your_api_key_here
```

For the `VITE_WEATHER_API_KEY` value, paste the key from your OpenWeatherMap account (see the [Vite env docs](https://vite.dev/guide/env-and-mode) for why the `VITE_` prefix is required.)

### 4) Run the app

Development mode: `npm run dev`  

### 5) Open in browser

`http://localhost:5173`


## Error Handling
User-facing errors are surfaced through `ErrorMessage` component:
- **Empty search input** - "Please enter a city name."
- **City not found (HTTP 404)** - "City not found. Please check the spelling."
- **Any other failure** (network error, bad API key, etc.) - "Something went wrong. Please try again."