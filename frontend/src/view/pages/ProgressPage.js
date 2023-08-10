import React from 'react';
import { Box, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';

import EpisodesEmotions from '../widgets/EpisodesEmotions.js';
import ModuleProgression from '../widgets/ModuleProgression.js';
import '../widgets/EpisodesChart.js';
import EpisodesChart from '../widgets/EpisodesChart.js';


function ProgressPage() {

  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 28, pt:2, mt:'70px' }} variant="h4" align='center' color="text.secondary">
              O Meu Progresso
            </Typography>
            <EpisodesChart/>
            <EpisodesEmotions/>
            <ModuleProgression/>
        </Box>
        <NavBar/>
        </>
  );
}

export default ProgressPage;
