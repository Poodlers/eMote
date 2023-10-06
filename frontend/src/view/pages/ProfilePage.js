import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';


function ProfilePage() {
  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
              Perfil
            </Typography>
            <Link href="/notifications" underline="none">
              <Typography sx={{ p:1, fontWeight:'bold !important', fontSize: 16, textAlign:'center' }} color="text.secondary" >
                Editar Lembretes
              </Typography>
            </Link>
            <Link href="/contact" underline="none">
              <Typography sx={{ p:1, fontWeight:'bold !important', fontSize: 16, textAlign:'center' }} color="text.secondary" >
                Entre em contacto connosco
              </Typography>
            </Link>
            <Link href="/appts" underline="none">
              <Typography sx={{ p:1, fontWeight:'bold !important', fontSize: 16, textAlign:'center' }} color="text.secondary" >
                Consultas de Psicologia
              </Typography>
            </Link>
            <Link href="/socialmedia" underline="none">
              <Typography sx={{ p:1, fontWeight:'bold !important', fontSize: 16, textAlign:'center' }} color="text.secondary" >
                Siga-nos nas redes sociais
              </Typography>
            </Link>
        </Box>
        <NavBar/>
        </>
  );
}

export default ProfilePage;