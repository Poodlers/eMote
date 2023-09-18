import React from 'react';
import { Box, Grid, IconButton, Link, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar';
import { NavBar } from '../widgets/NavBar';

import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { modulesThemes } from '../../constants/themes.js'


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

function SubmoduleListPage(props) {
    var module = null;
    var content = null;

    for (const obj of modulesThemes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }

    const list = [];

    for (const obj of submodules){

        for (const cont of submodulesContent) {
            if (cont.id === obj.id) {
                content = cont;
                break;
            }
        }
        console.log(obj)

        list.push(
            <Box key={obj.id} sx ={{p:5, pt:2, pb:2, bgcolor: obj.id%2===0? module.color3 : module.color1 , alignContent: 'center', width: '80%', m:'0 auto'}}>
                <Link underline="none" href={content.text ? module.introlink : module.exerciselink} >
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
                </Link>

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
