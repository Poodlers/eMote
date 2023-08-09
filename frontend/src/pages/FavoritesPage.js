import React from 'react';
import Modules from '../widgets/Modules.js';
import { Box, Grid, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import Diaries from '../widgets/Diaries.js';
import { NavBar } from '../widgets/NavBar.js';

import Titulo from '../images/titulo_favoritos.png';


function FavoritesPage() {

    var mockList = [
        "Tolerancia a estados emocionais dolorosos",
        "Tolerancia a estados emocionais dolorosos",
        "Tolerancia a estados emocionais dolorosos"
    ];

  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px'}}>
            <Grid container sx={{ p: 6 }} direction="row" justifyContent="center">
                <img src={Titulo} height={32}/>
            </Grid>
        </Box>
        {mockList.map(function(data) {
            return (
                <Typography color="primary" sx = {{fontWeight: "bold", p:1}} >
                    {data}
                </Typography>
            )
        })}
        <NavBar/>
        </>
  );
}

export default FavoritesPage;
