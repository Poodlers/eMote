import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

import imgPqnoAlmoco from '../../assets/images/p_almoco.png'
import imgLancheManha from '../../assets/images/lanche_manha.png'
import imgAlmoco from '../../assets/images/almoco.png'
import imgLancheTarde from '../../assets/images/lanche.png'
import imgJantar from '../../assets/images/jantar.png'
import imgCeia from '../../assets/images/ceia.png'
import imgOutraRef from '../../assets/images/outra_refeicao.png'
import SkipMeal from '../widgets/MealDiary/SkipMeal';
import TimeMeal from '../widgets/MealDiary/TimeMeal';
import FeelingMeal from '../widgets/MealDiary/FeelingMeal';
import DescriptionMeal from '../widgets/MealDiary/DescriptionMeal';
import AttentionMeal from '../widgets/MealDiary/AttentionMeal';
import RestrictMeal from '../widgets/MealDiary/RestrictMeal';
import CompulsiveEpisodeMeal from '../widgets/MealDiary/CompulsiveEpisodeMeal';
import CompensationMeal from '../widgets/MealDiary/CompensationMeal';
import CommentsMeal from '../widgets/MealDiary/CommentsMeal';
import ConfirmButton from '../widgets/MealDiary/ConfirmButton';


const imageList = [
    {
        meal: 'Pequeno Almoço',
        image: imgPqnoAlmoco
    },
    {
        meal: 'Lanche da Manhã',
        image: imgLancheManha
    },
    {
        meal: 'Almoço',
        image: imgAlmoco
    },
    {
        meal: 'Lanche da Tarde',
        image: imgLancheTarde
    },
    {
        meal: 'Jantar',
        image: imgJantar
    },        
    {
        meal: 'Ceia',
        image: imgCeia
    },
    {
        meal: 'Outra Refeição',
        image: imgOutraRef
    },
]

function MealTemplatePage(props) {
    var mealImage = null;
    for (const obj of imageList) {
        if (obj.meal === props.meal) mealImage = obj.image;
    }
  return (
    document.body.style = 'background: #01698b',
        <div>
        <Box sx={{mt:'10px', mb:'10px' }}>
          <Box sx ={{p:1, bgcolor: '#349db7', alignContent: 'center', width: '80%', m: '0 auto'}}>
            <Grid container spacing={2}>
                <Grid item >
                    <IconButton component={Link} to="/mealdiary" aria-label="back" size="large">
                        <ArrowBackIosIcon color='info' fontSize="inherit" />
                    </IconButton>
                </Grid>
                <Grid item sx={{ display:'flex', alignItems:'center', }}>
                    <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                        {props.meal}
                    </Typography>
                </Grid>
            </Grid>
          </Box>
            <div style={{ padding: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                <img alt="logo" style={{ alignSelf: 'center' }} src={mealImage} />
            </div>

          <Box sx={{p:2}}>
            <SkipMeal/>
            <TimeMeal/>
            <FeelingMeal/>
            <DescriptionMeal/>
            <AttentionMeal/>
            <RestrictMeal/>
            <CompulsiveEpisodeMeal/>
            <CompensationMeal/>
            <CommentsMeal/>
            <ConfirmButton/>
          </Box>
        </Box>
        </div>
  );
}

export default MealTemplatePage;
