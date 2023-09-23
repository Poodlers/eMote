import React from 'react';
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar';

import { modulesThemes } from '../../constants/themes.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import phonesPurple from '../../assets/images/phones_rosa.png';
import phonesGreen from '../../assets/images/phones.png';

import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';

const submodulesContent = {
    id:0,text:null,videoFile:null,
    imageFile:null,otherFile:null,
    exercicios:[{id:1,moduloNumberOrder:0,
    exercicioName:"Exercício 1 - Respiração diafragmática",
    exercicioFile:"submod2.1_ativ1.mp4"}, {id:2,moduloNumberOrder:0,
        exercicioName:"Exercício 1 - Respiração diafragmática",
        exercicioFile:"submod2.1_ativ1.pdf"}, {id:3,moduloNumberOrder:0,
            exercicioName:"Exercício 1 - Respiração diafragmática",
            exercicioFile:"submod2.1_ativ1.mp4"}]
}

function SubmoduleExercisePage(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if(isPlaying){
            //audioElem.current.play();
            console.log('playing');
        }
        else{
            //audioElem.current.pause();
            console.log('paused');
        }
    })

    var module = null;

    for (const obj of modulesThemes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }
    
  return (
    document.body.style = 'background:' + module.color2,
    <>
    {/*<audio src=''/>*/}
    <LogoAppBar color={module.theme} goBack={true}/>
    <AppBar sx ={{boxShadow: 'none', top: '60px', backgroundColor: module.color1 }} >
        <Box sx ={{p:5, pt:2, pb:2, alignContent: 'center', width: '80%', m:'0 auto'}}>
            <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                {props.name}
            </Typography>
        </Box>
    </AppBar>

    <Box sx={{mt:'120px', mb:'70px'}}>

      <Box sx= {{pt:1}} textAlign='center'>
        {submodulesContent.exercicios.map(function(data){
            return (
            <>
                <Box sx= {{pt:3}}> 
                    <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 22, fontWeight: 500 }} variant='body1' color={"white"}>
                        {data.exercicioName}
                    </Typography>
                </Box>
                <Box sx= {{p:3}}>
                    <Grid container direction='row'>
                        <Grid item xs={9}>
                            <img alt='phones' src={props.name == 'Regulação emocional'? phonesPurple : phonesGreen}/>
                        </Grid>
                        <Grid item alignSelf='end' xs={3}>
                            <IconButton size='large' onClick={()=>{setIsPlaying(!isPlaying)}} >
                                {isPlaying ? 
                                <PauseCircleFilledIcon sx={{ fontSize: 60 }} htmlColor={props.name == 'Regulação emocional'? '#ac7c94' : '#53b8c4' } />
                                : <PlayCircleFilledIcon sx={{ fontSize: 60 }} htmlColor={props.name == 'Regulação emocional'? '#ac7c94' : '#53b8c4' } /> }
                            </IconButton>
                        </Grid>
                    </Grid>

                    <IconButton sx={{p:3}} size='large' onClick={()=>{setIsFavorite(!isFavorite)}} >
                        {isFavorite ? 
                        <FavoriteIcon sx={{ fontSize: 60 }} htmlColor={props.name == 'Regulação emocional'? '#ac7c94' : '#53b8c4' } />
                        : <FavoriteBorderIcon sx={{ fontSize: 60 }} htmlColor={props.name == 'Regulação emocional'? '#ac7c94' : '#53b8c4' } /> }
                    </IconButton>
                </Box>
            </>
            )
        })}


      </Box>
      
        <IconButton component={Link} to={module.feedbacklink} sx={{ bottom:"5%", left:"70%" }}>
            <img alt='check' src={module.check}/>
        </IconButton>
    </Box>

    </>

  );
}

export default SubmoduleExercisePage;
