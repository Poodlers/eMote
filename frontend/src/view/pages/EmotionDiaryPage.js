import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DiaryLogo from '../../assets/images/diario_emocoes.png'
import EmotionsButton from '../widgets/EmotionsButton';
import ExercisesButton from '../widgets/ExercisesButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import ReflexionForm from '../widgets/ReflexionForm';

function EmotionDiaryPage() {
  return (
        <div>
        <Box sx={{mt:'10px', mb:'10px' }}>
        <IconButton component={Link} to="/" aria-label="back" size="large">
            <ArrowBackIosIcon color= "secondary" fontSize="inherit" />
        </IconButton>
            <div style={{ paddingBottom: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                <img alt="logo" style={{ alignSelf: 'center' }} src={DiaryLogo} width='30%'/>
            </div>
            <Typography gutterBottom sx={{ pb:1, textAlign: 'center', fontSize: 17, fontWeight: 500, color: "#e7007f" }} variant='body1'>
                Diário das Emoções
            </Typography>
          <Box sx={{p:2}}>
            <EmotionsButton/>
            <ExercisesButton/>
            <ReflexionForm/>
          </Box>
        </Box>
        </div>
  );
}

export default EmotionDiaryPage;
