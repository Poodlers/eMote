import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

function ContactPage() {

  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
        <IconButton component={Link} to="/profile" aria-label="back" size="large">
            <ArrowBackIosIcon color= "primary" fontSize="inherit" />
        </IconButton>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, pb:2.5 }} variant="h4" align='center' color="text.secondary">
            Entre em contacto
          </Typography>
          <Typography sx={{p:2, fontSize: 16, textAlign:'center', textDecoration: 'none'}} color="text.secondary" >
            Caso deseje entrar em contacto connosco, envie uma mensagem para o email <b>emote.projeto@gmail.com</b>.
          </Typography>
        </Box>
        <NavBar/>
        </>
  );
}

export default ContactPage;
