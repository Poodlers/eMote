import React from 'react';
import { Box, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    fontSize: 16,
    textAlign:'center',
    textDecoration: 'none'
  }
})


function ContactPage() {

  const classes = useStyles();
  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
            Entre em contacto
          </Typography>
          <Typography sx={{p:2}} className={classes.root} color="text.secondary" >
            Caso deseje entrar em contacto connosco, envie uma mensagem para o email <b>emote.projeto@gmail.com</b>.
          </Typography>
        </Box>
        <NavBar/>
        </>
  );
}

export default ContactPage;
