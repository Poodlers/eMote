import * as React from 'react';
import { Grid, Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import Emocoes from '../../assets/images/diario_icon.png';
import Refeicoes from '../../assets/images/refeicoes_icon.png';


const colorCards = ['#349cb6', '#d8accc']

export default function DiaryCard(props) {
  return (
    <Box sx ={{p:2}}>
        <Link href={props.blocked ? '#' : props.name === 'Emoções' ? "/emotiondiary" : "/mealdiary"}>
            <Grid container sx={{ p: 0.5 }} direction="row" justifyContent="center">
                <img alt= {props.name} src={props.name === 'Emoções' ? Emocoes : Refeicoes} height={120}/>
            </Grid>
        </Link>
        <Typography sx={{ pt:1, textAlign: 'center', fontSize: 13, fontWeight: 'bold' }} variant='body1' color={colorCards[props.index]}>
            Diário das {props.name}
        </Typography>

    </Box>
  );
}