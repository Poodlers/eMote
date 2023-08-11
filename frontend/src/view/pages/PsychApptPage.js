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


function PsychApptPage() {

  const classes = useStyles();
  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
            Consultas de Psicologia
          </Typography>
          <Typography sx={{p:1}} className={classes.root} color="text.secondary" >
            Converse com o seu médico de família sobre os seus sintomas e dificuldades alimentares. Ele irá encaminhá-la para o serviço de Psicologia mais adequado às suas necessidades. 
            <br/>Existem também serviços de Psicologia onde poderá marcar consulta:
          </Typography>
          
          <Typography sx={{p:2}} className={classes.root} color="text.secondary" >
            •	Serviço de Consulta Psicológica da Faculdade de Psicologia e de Ciências da Educação da Universidade do Porto 
            <br/><b>Email:</b> secretariado_consultas@fpce.up.pt
            <br/><b>Telefone:</b> 22 040 0600 | 22 042 89 22
          </Typography>
          
          <Typography className={classes.root} color="text.secondary" >
            •	Centro de Apoio e Serviço Psicológico da Universidade da Maia
            <br/><b>Email:</b> casp@ismai.pt
            <br/><b>Telefone:</b> 22 986 60 92
          </Typography>
        </Box>
        <NavBar/>
        </>
  );
}

export default PsychApptPage;
