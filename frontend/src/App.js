import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import myTheme from './theme.js'

import LandingPage from './view/pages/LandingPage.js';
import FavoritesPage from './view/pages/FavoritesPage.js';
import ProgressPage from './view/pages/ProgressPage.js';
import ProfilePage from './view/pages/ProfilePage.js';
import SocialMediaPage from './view/pages/SocialMediaPage.js';
import PsychApptPage from './view/pages/PsychApptPage.js';
import ContactPage from './view/pages/ContactPage.js';

const theme = myTheme;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/favorites' element={< FavoritesPage/>} />
        <Route path='/progress' element={< ProgressPage/>} />
        <Route path='/profile' element={< ProfilePage/>} />
        <Route path='/socialmedia' element={< SocialMediaPage/>} />
        <Route path='/appts' element={< PsychApptPage/>} />
        <Route path='/contact' element={< ContactPage/>} />
      </Routes>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
