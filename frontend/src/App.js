import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import myTheme from './theme.js'
import LandingPage from './pages/LandingPage.js';
import FavoritesPage from './pages/FavoritesPage.js';
const theme = myTheme;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/favorites' element={< FavoritesPage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
