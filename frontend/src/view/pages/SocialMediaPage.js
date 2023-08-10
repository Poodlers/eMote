import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    fontSize: 16,
    textAlign:'center', 
    fontWeight:'bold', 
    p:1
  }
})


function SocialMediaPage() {

  const classes = useStyles();
  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
            Redes Sociais
          </Typography>
          <Grid container sx={{ p: 0.5 }} direction="row" align="center">
            <Grid item xs={6} sx={{ p: 2 }}>
              <a href="https://facebook.com/">
                <img src='https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/512px-Facebook_f_logo_%282021%29.svg.png?20210818083032' width='35%'/>
                <Typography className={classes.root} color="text.secondary" >
                  @
                </Typography>
              </a>
            </Grid>
            <Grid item xs={6} sx={{ p: 2 }}>
              <a href="https://instagram.com/">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png?20210403190622' width='35%'/>
                <Typography className={classes.root} color="text.secondary" >
                  @
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
