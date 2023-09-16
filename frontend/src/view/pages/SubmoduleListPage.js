import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LogoAppBar } from '../widgets/LogoAppBar';
import { NavBar } from '../widgets/NavBar';

import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';


/* const submodules = [
    {id:13,text:null,videoFile:null,
    imageFile:null,otherFile:null,
    exercicios:[{id:1,moduloNumberOrder:0,
    exercicioName:"Exercício 1 - Respiração diafragmática",
    exercicioFile:"submod2.1_ativ1.mp3"}]},
    {id:6,text:"Aqui pode ver o modelo de regulação emocional para o episódio de ingestão alimentar compulsiva da Ângela.",
    videoFile:null,imageFile:"submod4_ativ2.png",otherFile:null,
    exercicios:[]}
] */

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

const themes = [
    {
        name: "Psicoeducação",
        theme: "orange",
        color1: "#f48d0d",
        color2: "#f3b890",
        color3: "#f9b12c"
    },
    {
        name: "Mindfulness",
        theme: "green",
        color1: "#519a96",
        color2: "#9bcdbb",
        color3: "#77bdb1"
    },
    {
        name: "Regulação emocional",
        theme: "purple",
        color1: "#a87e95",
        color2: "#f5c3e8",
        color3: "#d2aed1"
    },
    {
        name: "Tolerância a estados emocionais dolorosos",
        theme: "blue",
        color1: "#52b9c4",
        color2: "#d7fcfa",
        color3: "#8ce4ea"
    },
]

function SubmoduleListPage(props) {
    var module = null;

    for (const obj of themes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }

    const list = [];

    for (const obj of submodules){
        console.log(obj)
        list.push(
            <Box key={obj.id} sx ={{p:5, pt:2, pb:2, bgcolor: obj.id%2===0? module.color3 : module.color1 , alignContent: 'center', width: '80%', m:'0 auto'}}>
                <Grid direction='row' container spacing={2}>
                    <Grid item xs={1}>
                        {obj.blocked ? <Lock htmlColor={'white'}/> : <LockOpen htmlColor={'white'}/>}
                    </Grid>
                    <Grid item xs={11} sx={{ display:'flex', alignItems:'center', }}>
                        <Typography sx={{ fontSize: 18, }} variant='body1' color={"white"}>
                            {obj.name}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }
    
  return (
    document.body.style = 'background:' + module.color2,
    <>
    <LogoAppBar color={module.theme}/>

    <Box sx={{mt:'60px', mb:'70px'}}>
      <Box sx ={{p:5, pt:2, pb:2, bgcolor: module.color1, alignContent: 'center', width: '80%', m:'0 auto'}}>
        <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
            {props.name}
        </Typography>
      </Box>

      <Box sx= {{pt:1}} textAlign='center'>
        {list}
      </Box>
    </Box>



    <NavBar color={module.theme}/>
    </>

  );
}

export default SubmoduleListPage;
