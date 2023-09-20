import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar';

import { modulesThemes } from '../../constants/themes.js';
import { Link } from 'react-router-dom';

const submodulesContent = [
    {id:0,text:null,videoFile:null,
    imageFile:null,otherFile:null,
    exercicios:[{id:1,moduloNumberOrder:0,
    exercicioName:"Exercício 1 - Respiração diafragmática",
    exercicioFile:"submod2.1_ativ1.mp3"}]},
    {id:1,text:"Aqui pode ver o modelo de regulação emocional para o episódio de ingestão alimentar compulsiva da Ângela.",
    videoFile:null,imageFile:"submod4_ativ2.png",otherFile:null,
    exercicios:[]}
] 

const submodules = [
    {
        id: 0,
        name: 'O que é uma ingestão alimentar compulsiva?',
        blocked: false
    },
    {
        id: 1,
        name:'O que são comportamentos compensatórios inapropriados?',
        blocked: true
    },
    {
        id: 2,
        name: 'Regulação emocional e ingestão alimentar compulsiva',
        blocked: true
    }   
]

function SubmoduleExercisePage(props) {
    var module = null;

    for (const obj of modulesThemes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }
    
  return (
    document.body.style = 'background:' + module.color2,
    <>
    <LogoAppBar color={module.theme} goBack={true}/>

    <Box sx={{mt:'60px', mb:'70px'}}>
      <Box sx ={{p:5, pt:2, pb:2, bgcolor: module.color1, alignContent: 'center', width: '80%', m:'0 auto'}}>
        <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
            {props.name}
        </Typography>
      </Box>

      <Box sx= {{pt:1}} textAlign='center'>
        {/* exercício é mostrado aqui */}
      </Box>
      
        <IconButton component={Link} to={module.feedbacklink} 
            sx={{ bottom: "5%",
                left: "70%",
                position: "absolute" }}
        >
            <img alt='check' src={module.check}/>

        </IconButton>
    </Box>

    </>

  );
}

export default SubmoduleExercisePage;
