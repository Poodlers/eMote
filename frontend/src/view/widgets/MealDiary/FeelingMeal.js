import * as React from 'react';
import { Grid, Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography';

import button from '../../../assets/images/botao_comosenti.png'

export default function FeelingMeal(props) {
  return (
    <Box sx ={{p:1 }}>
        <Grid container sx={{ p: 0.5, placeItems:"center" }} direction="row" >
            <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                Como me senti
            </Typography>
            <Link href="/emotionsmeal" sx ={{p:2}}>
                <img alt='button' height='30px' src={button}/>
            </Link>
        </Grid>
    </Box>
  );
}