import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';

import Titulo from '../../assets/images/titulo_favoritos.png';


function FavoritesPage() {

    const mockList = [
        "Tolerancia a estados emocionais dolorosos",
        "Tolerancia a estados emocionais dolorosos",
        "Tolerancia a estados emocionais dolorosos"
    ];

  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
            <Grid container sx={{ pt:5, pb:4 }} direction="row" justifyContent="center">
                <img src={Titulo} height={32}/>
            </Grid>
            {mockList.map(function(data) {
            return (
                <Typography color="primary" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                    {data}
                </Typography>
            )
            })}
        </Box>
        <NavBar/>
        </>
  );
}

export default FavoritesPage;
