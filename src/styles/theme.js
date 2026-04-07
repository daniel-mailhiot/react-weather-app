// MUI theme config (https://mui.com/material-ui/customization/how-to-customize/)
import { createTheme } from '@mui/material/styles'

// getTheme - returns a complete MUI theme object based on the mode ('light' or 'dark')
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors
          background: {
            default: '#fafafa',
            paper: '#ffffff', // for cards, dialogs, menus
          },
          primary: {
            main: '#212121', // black for buttons and primary elements
          },
          text: {
            primary: '#1a1a2e',
            secondary: '#555555',
          },
          error: {
            main: '#d32f2f', // for error messages
          },
        }
      : {
          // Dark mode colors
          background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
          },
          primary: {
            main: '#e0e0e0',
          },
          text: {
            primary: '#e0e0e0', 
            secondary: '#aaaaaa',
          },
          error: {
            main: '#d32f2f',
          },
        }),
  },
  
    // Font - use Funnel Display for all text
  typography: {
    fontFamily: "'Funnel Display', sans-serif",
  },

  // Sharp corners globally
  shape: {
    borderRadius: 0,
  },
  // Component overrides - enforce sharp corners instead of MUI's default rounded corners
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
  },
})

export default getTheme
