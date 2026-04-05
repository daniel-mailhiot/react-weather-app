// TempToggle component - button switches between Celsius and Fahrenheit
function TempToggle({ unit, onToggle }) {
  return (
    <button className='temp-toggle' onClick={onToggle}>
      {/* Show the opposite unit of the action the button will perform */}
      Switch to {unit === 'celsius' ? '°F' : '°C'}
    </button>
  )
}

export default TempToggle
