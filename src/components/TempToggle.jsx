import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

// TempToggle component - button switches between Celsius and Fahrenheit
function TempToggle({ unit, onToggle }) {
  return (
    <ToggleButtonGroup
      value={unit}
      exclusive
      onChange={onToggle}
      size='small'
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <ToggleButton value='celsius'>°C</ToggleButton>
      <ToggleButton value='fahrenheit'>°F</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default TempToggle