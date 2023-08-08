import React from 'react';
import Modules from '../widgets/Modules.js';
import { Box, Typography } from '@mui/material';
import { LogoAppBar } from '../AppBar.js';
import Diaries from '../widgets/Diaries.js';

function LandingPage() {
  return (
      <div className="App">
        <LogoAppBar/>
        <Box sx={{mt:'60px'}}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5 }} variant="h4" align='center' color="text.primary">Bem-vinda à eMOTE!</Typography>
          <Box sx={{p:2}}>
            <Modules/>
            <Diaries/>
          </Box>
        </Box>
      </div>
  );
}

export default LandingPage;
