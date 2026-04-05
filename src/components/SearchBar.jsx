import { useState } from 'react'

// SearchBar component - onSearch comes from App and sends the city name back when called
function SearchBar({ onSearch }) {
  const [city, setCity] = useState('')

  // When the form is submitted, send the city to App and clear the input
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(city.trim()) // send whatever the user typed (even if empty) - App handles the error message
    setCity('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter city name...'
        value={city}
        onChange={(e) => setCity(e.target.value)} // update state on each keystroke
      />
      <button type='submit'>Search</button>
    </form>
  )
}

export default SearchBar
