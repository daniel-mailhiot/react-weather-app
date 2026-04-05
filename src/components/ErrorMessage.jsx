// ErrorMessage component - displays an error message from App
function ErrorMessage({ message }) {
  // If there's no error, don't render anything
  if (!message) {
    return null
  }

  return (
    <div className='error-message'>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage