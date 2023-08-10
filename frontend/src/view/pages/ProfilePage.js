import React from 'react';
import { Box, Link, Typography } from '@mui/material';
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

function ProfilePage() {
  const classes = useStyles();
  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
              Perfil
            </Typography>
            <Link href="#" underline="none">
              <Typography className={classes.root} color="text.secondary" >
                Editar Lembretes
              </Typography>
            </Link>
            <Link href="#" underline="none">
              <Typography className={classes.root} color="text.secondary" >
                Entre em contato connosco
              </Typography>
            </Link>
            <Link href="#" underline="none">
              <Typography className={classes.root} color="text.secondary" >
                Consultas de Psicologia
              </Typography>
            </Link>
            <Link href="/socialmedia" underline="none">
              <Typography className={classes.root} color="text.secondary" >
                Siga-nos nas redes sociais
              </Typography>
            </Link>
        </Box>
        <NavBar/>
        </>
  );
}

export default ProfilePage;
