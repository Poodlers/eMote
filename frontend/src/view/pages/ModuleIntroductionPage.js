import React from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { Link } from 'react-router-dom';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ante at ipsum mattis varius eget ornare ligula. Sed vitae dignissim leo, et ullamcorper dolor. Donec iaculis convallis tristique. Etiam libero eros, tempus non euismod eu, dignissim a dui. Nulla auctor mattis neque et molestie. Ut luctus massa ut purus viverra volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Sed varius urna tortor, blandit consequat lacus consequat eget. Nulla facilisi. '

const themes = [
    {
        name: "Psicoeducação",
        theme: "orange",
        color1: "#f48d0d",
        color2: "#f3b890",
    },
    {
        name: "Mindfulness",
        theme: "green",
        color1: "#519a96",
        color2: "#9bcdbb",
    },
    {
        name: "Regulação emocional",
        theme: "purple",
        color1: "#a87e95",
        color2: "#f5c3e8",
    },
    {
        name: "Tolerância a estados emocionais dolorosos",
        theme: "blue",
        color1: "#52b9c4",
        color2: "#d7fcfa",
    },
]

function ModuleIntroductionPage(props) {
    var module = null;

    for (const obj of themes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }
  return (
    
        document.body.style = 'background:' + module.color2,
        <>
        <LogoAppBar color={module.theme}/>

        <Box sx={{mt:'60px', mb:'70px'}}>
          <Box sx ={{p:3, bgcolor: module.color1, alignContent: 'center', width: '80%', m:'0 auto'}}>
            <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                {props.name}
            </Typography>
          </Box>
          <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, fontSize: 20 }} variant='body1'>
                {lorem}
            </Typography>
        </Box>

        <Box sx ={{ p:3 }} textAlign='center'>
            <Button sx ={{ p:1, bgcolor: module.color1 }}>
                <Typography gutterBottom color={"white"} sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' >
                    Vamos começar?
                </Typography>
            </Button>
        </Box>

        <NavBar color={module.theme}/>
        </>
  );
}

export default ModuleIntroductionPage;
