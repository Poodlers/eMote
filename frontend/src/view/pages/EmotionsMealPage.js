import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import DiaryLogo from '../../assets/images/diario_emocoes_icon.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

import imgAborrecida from '../../assets/images/aborrecida.png';
import imgAnsiosa from '../../assets/images/ansiosa.png';
import imgCulpada from '../../assets/images/culpada.png';
import imgEnvergonhada from '../../assets/images/envergonhada.png';
import imgEntusiasmada from '../../assets/images/entusiasmada.png';
import imgFeliz from '../../assets/images/feliz.png';
import imgFrustrada from '../../assets/images/frustrada.png';
import imgFuriosa from '../../assets/images/furiosa.png';
import imgIrritada from '../../assets/images/irritada.png';
import imgMotivada from '../../assets/images/motivada.png';
import imgOrgulhosa from '../../assets/images/orgulhosa.png';
import imgSozinha from '../../assets/images/sozinha.png';
import imgTranquila from '../../assets/images/tranquila.png';
import imgTriste from '../../assets/images/triste.png';


    const imageList = [
        {
            feeling: 'Ansiosa',
            image: imgAnsiosa
        },
        {
            feeling: 'Aborrecida',
            image: imgAborrecida
        },
        {
            feeling: 'Culpada',
            image: imgCulpada
        },
        {
            feeling: 'Entusiasmada',
            image: imgEntusiasmada
        },
        {
            feeling: 'Envergonhada',
            image: imgEnvergonhada
        },        
        {
            feeling: 'Feliz',
            image: imgFeliz
        },
        {
            feeling: 'Frustrada',
            image: imgFrustrada
        },
        {
            feeling: 'Furiosa',
            image: imgFuriosa
        },
        {
            feeling: 'Irritada',
            image: imgIrritada
        },
        {
            feeling: 'Motivada',
            image: imgMotivada
        },
        {
            feeling: 'Orgulhosa',
            image: imgOrgulhosa
        },
        {
            feeling: 'Sozinha',
            image: imgSozinha
        },
        {
            feeling: 'Tranquila',
            image: imgTranquila
        },
        {
            feeling: 'Triste',
            image: imgTriste
        }
    ];

function EmotionsMealPage(props) {
  return (

        <Box sx={{mt:'10px', mb:'10px', backgroundColor: '#e6d4e0' }}>
            <IconButton component={Link} to={props.link} aria-label="back" size="large">
                <ArrowBackIosIcon color= "secondary" fontSize="inherit" />
            </IconButton>
            <Box sx ={{p:1, bgcolor: '#ec6fa7', alignSelf: 'center', width: '80%', m: '0 auto'}}>
                <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Como me senti hoje?
                </Typography>
            </Box>
          <Box sx={{p:2}}>
          <Grid container spacing={2}>
            <Grid item xs={4} key="diarylogo">
                <img alt='logo' style={{ opacity: '25%'}} src={DiaryLogo}/>
            </Grid>
            {imageList.map(function(data) {
                return (
                    <Grid item xs={4} key= {data.feeling}>
                        <img alt='feeling' src={data.image}/>
                    </Grid>
                )
            })}
            </Grid>
          </Box>
        </Box>
  );
}

export default EmotionsMealPage;
