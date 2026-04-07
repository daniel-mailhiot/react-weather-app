import Alert from '@mui/material/Alert'

// ErrorMessage component - displays an error message from App
function ErrorMessage({ message }) {
  // If there's no error, don't render anything
  if (!message) {
    return null
  }

  return (
    <Alert severity='error' sx={{ my: 2 }}>
      {message}
    </Alert>
  )

}

export default ErrorMessage