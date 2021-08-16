import { useState } from 'react'
import './App.css';
import { createTheme } from '@material-ui/core/styles';
import { theme } from './_Customize';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles'
import Routing from './Custom/Routing';
import { AuthContext, AuthProvider, ProfileContext, ProfileProvider } from './Providers';
function App() {
  const [darkMode, setDarkMode] = useState(false)
  const switchThemeMode = () => setDarkMode(!darkMode)
  const APP_THEME = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    },
    ...theme,
  })
  return (
      <ThemeProvider theme={APP_THEME}>
        <CssBaseline />
        <AuthProvider>
          <AuthContext.Consumer>
            {currentUser => (
              <ProfileProvider>
                <ProfileContext.Consumer>
                  {profile => <Routing {...{ user: currentUser, profile, isDarkMode: darkMode, switchTheme: switchThemeMode }} />}
                </ProfileContext.Consumer>
              </ProfileProvider>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;
