import React from 'react';
import Modules from '../widgets/Modules.js';
import { Box, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import Diaries from '../widgets/Diaries.js';
import { NavBar } from '../widgets/NavBar.js';

function LandingPage() {
  return (
    document.body.style = 'background: #fffefe',
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="primary">Bem-vinda à eMOTE!</Typography>
          <Box sx={{p:2}}>
            <Modules/>
            <Diaries/>
          </Box>
        </Box>
        <NavBar/>
        </>
  );
}

export default LandingPage;
