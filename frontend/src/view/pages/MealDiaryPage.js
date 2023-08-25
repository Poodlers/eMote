import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DiaryLogo from '../../assets/images/refeicoes_icon.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import MealButton from '../widgets/MealDiary/MealButton';

function MealDiaryPage() {
    
  return (
    document.body.style = 'background: #01698b',
        <div>
        <Box sx={{mt:'10px', mb:'10px' }}>
        <IconButton component={Link} to="/" aria-label="back" size="large">
            <ArrowBackIosIcon htmlColor= "#349db7" fontSize="inherit" />
        </IconButton>
            <div style={{ paddingBottom: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                <img alt="logo" style={{ alignSelf: 'center' }} src={DiaryLogo} width='30%' />
            </div>
            <Typography gutterBottom sx={{ pb:1, textAlign: 'center', fontSize: 17, fontWeight: 500 }} variant='body1' color={"white"}>
                Diário das Refeições
            </Typography>
          <Box sx={{p:2}}>
            <MealButton meal= "Pequeno Almoço" href="/pqnoalmoco"/>
            <MealButton meal= "Lanche da Manhã" href="/lanchemanha"/>
            <MealButton meal= "Almoço" href="/almoco"/>
            <MealButton meal= "Lanche da Tarde" href="/lanche" />
            <MealButton meal= "Jantar" href="/jantar" />
            <MealButton meal= "Ceia" href="/ceia"/>
            <MealButton meal= "Outra Refeição" href="/outraref"/>
          </Box>
        </Box>
        </div>
  );
}

export default MealDiaryPage;
