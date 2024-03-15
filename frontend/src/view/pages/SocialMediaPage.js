import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';


function SocialMediaPage() {

  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
        <IconButton component={Link} to="/profile" aria-label="back" size="large">
            <ArrowBackIosIcon color= "primary" fontSize="inherit" />
        </IconButton>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, pb:2.5 }} variant="h4" align='center' color="text.secondary">
            Siga-nos
          </Typography>
          <Grid container sx={{ p: 0.5 }} direction="row" align="center">
            <Grid item xs={6} sx={{ p: 2 }}>
              <a style= {{ textDecoration: 'none'}} href="https://www.facebook.com/profile.php?id=100094438599267 /">
                <img alt='fb' src='https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/512px-Facebook_f_logo_%282021%29.svg.png?20210818083032' width='35%'/>
                <Typography color="text.secondary" >
                Projeto.EMOTE
                </Typography>
              </a>
            </Grid>
            <Grid item xs={6} sx={{ p: 2 }}>
              <a style= {{ textDecoration: 'none'}} href="https://instagram.com/emote.binge.eating">
                <img alt='insta' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png?20210403190622' width='35%'/>
                <Typography color="text.secondary" >
                  @emote.binge.eating
                </Typography>
              </a>
            </Grid>
          </Grid>
        </Box>
        <NavBar/>
        </>
  );
}

export default SocialMediaPage;
