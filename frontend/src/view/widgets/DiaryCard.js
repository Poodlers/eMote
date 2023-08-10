import * as React from 'react';
import { Grid, Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import Emocoes from '../../assets/images/diario_icon.png';
import Refeicoes from '../../assets/images/refeicoes_icon.png';


const colorCards = {
    1: '#d8accc',
    2: '#349cb6',
}

export default function DiaryCard(props) {
    var thisColor = props.name == 'Emoções' ? colorCards[1] : colorCards[2]
  return (
    <Box sx ={{p:2}}>
        <Link href="#">
            <Grid container sx={{ p: 0.5 }} direction="row" justifyContent="center">
                <img src={props.name == 'Emoções' ? Emocoes : Refeicoes} height={120}/>
            </Grid>
        </Link>
        <Typography sx={{ pt:1, textAlign: 'center', fontSize: 13, fontWeight: 'bold' }} variant='body1' color={thisColor}>
            Diário das {props.name}
        </Typography>
        <Grid container sx={{ p: 0.5 }} direction="row" justifyContent="center">
            {props.blocked ? <Lock htmlColor = {thisColor}/> : <LockOpen htmlColor = {thisColor}/>}
        </Grid>
    </Box>
  );
}