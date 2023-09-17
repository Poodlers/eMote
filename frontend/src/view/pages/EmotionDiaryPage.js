import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import DiaryLogo from '../../assets/images/diario_emocoes.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import ReflexionForm from '../widgets/EmotionsDiary/ReflexionForm';
import EmotionsDialog from '../widgets/EmotionsDialog';
import ExercisesDialog from '../widgets/EmotionsDiary/ExercisesDialog';

function EmotionDiaryPage() {
  return (
    document.body.style = 'background: #e6d4e0',
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
            <EmotionsDialog/>
            <ExercisesDialog/>
            <ReflexionForm/>

            <Box sx ={{ p:3 }} textAlign='center'>
              <Button sx ={{ p:1, bgcolor: '#ec6fa7' }}>
                  <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                      Confirmar
                  </Typography>
              </Button>
            </Box>

          </Box>
        </Box>
        </div>
  );
}

export default EmotionDiaryPage;
