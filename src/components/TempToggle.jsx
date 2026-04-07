import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// TempToggle component - animated sliding toggle between Celsius/Fahrenheit
function TempToggle({ unit, onToggle }) {
  const isCelsius = unit === 'celsius'

  return (
    <Box
      onClick={onToggle}
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: 60,
        height: 25,
        bgcolor: 'action.hover',
        cursor: 'pointer',
        border: 1,
        borderColor: 'divider',
        userSelect: 'none',
      }}
    >
      {/* Sliding indicator */}
      <Box
        sx={{
          position: 'absolute',
          width: '50%',
          height: '100%',
          bgcolor: 'primary.main',
          transition: 'transform 0.3s ease',
          transform: isCelsius ? 'translateX(0%)' : 'translateX(100%)',
        }}
      />

      {/* Celsius label */}
      <Typography
        variant='body2'
        sx={{
          flex: 1,
          textAlign: 'center',
          zIndex: 1,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: isCelsius ? 'primary.contrastText' : 'text.secondary',
          transition: 'color 0.3s ease',
        }}
      >
        °C
      </Typography>

      {/* Fahrenheit label */}
      <Typography
        variant='body2'
        sx={{
          flex: 1,
          textAlign: 'center',
          zIndex: 1,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: isCelsius ? 'text.secondary' : 'primary.contrastText',
          transition: 'color 0.3s ease',
        }}
      >
        °F
      </Typography>
    </Box>
  )
}

export default TempToggle