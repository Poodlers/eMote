import React from 'react';
import { ThemeProvider } from '@mui/material';
import myTheme from './theme.js'
import LandingPage from './pages/LandingPage.js';
const theme = myTheme;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage/>
    </ThemeProvider>
  );
}

export default App;
