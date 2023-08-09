import React from 'react';
import Modules from '../widgets/Modules.js';
import { Box, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import Diaries from '../widgets/Diaries.js';
import { NavBar } from '../widgets/NavBar.js';

function FavoritesPage() {
  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px'}}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5 }} variant="h4" align='center' color="text.primary">Bem-vinda à eMOTE!</Typography>
          <Box sx={{p:2}}>
          </Box>
        </Box>
        <NavBar/>
        </>
  );
}

export default FavoritesPage;
