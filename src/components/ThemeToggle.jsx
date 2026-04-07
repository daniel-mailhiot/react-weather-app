// ThemeToggle component, button switches between dark/light mode
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

function ThemeToggle({ darkMode, onToggle }) {
  return (
    <IconButton onClick={onToggle}>
      {/* Show moon icon in light mode, sun icon in dark mode */}
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export default ThemeToggle
