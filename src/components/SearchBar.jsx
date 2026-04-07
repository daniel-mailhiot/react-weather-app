import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
    <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, my: 2 }}>
      <TextField
        fullWidth
        size='small'
        placeholder='Enter city name...'
        value={city}
        onChange={(e) => setCity(e.target.value)} // update state on each keystroke
      />
      <Button type='submit' variant='contained'>
        Search
      </Button>
    </Box>
  )
}

export default SearchBar
