import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  // Callback function sent to SearchBar, triggered when user submits a city
  const handleSearch = (city) => {
    console.log('User searched for:', city)
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      {/* Send handleSearch so SearchBar can send the city name back here */}
      <SearchBar onSearch={handleSearch} />
    </div>
  )
}

export default App
