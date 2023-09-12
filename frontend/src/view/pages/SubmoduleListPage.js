import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DiaryLogo from '../../assets/images/refeicoes_icon.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { LogoAppBar } from '../widgets/LogoAppBar';
import { NavBar } from '../widgets/NavBar';

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

function SubmoduleListPage(props) {
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

      <Box sx ={{ p:3}} textAlign='center'>
blabla
      </Box>
    </Box>



    <NavBar color={module.theme}/>
    </>

  );
}

export default SubmoduleListPage;
