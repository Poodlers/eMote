import * as React from 'react';
import { Grid, colors } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';

const colorCards = {
    1: [colors.deepOrange[100], colors.deepOrange[500]],
    2: [colors.indigo[100], colors.indigo[500]],
    3: [colors.deepPurple[100], colors.deepPurple[500]],
    4: [colors.cyan[100], colors.cyan[500]],
}

export default function ModuleCard(props) {
  return (
    <Button disableRipple={true} sx = {{textTransform:'none', textAlign:'start'}}>
    <Card sx={{ height:120, minWidth: 150, bgcolor: colorCards[props.index][0] }}>
      <CardContent>
        <Typography sx={{ fontSize: 11 }} color={colorCards[props.index][1]} >
          Módulo {props.index}
        </Typography>
        <hr color={colorCards[props.index][1]}/>
        <Typography sx={{ fontSize: 11, fontWeight: 'bold' }} color={colorCards[props.index][1]} variant="h5" component="div">
          {props.name}
        </Typography>
        <Grid container sx={{ p: 0.5 }} direction="row" justifyContent="center" alignItems="flex-end">
            {props.blocked ? <Lock htmlColor='#fff'/> : <LockOpen htmlColor='#fff'/>}
        </Grid>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </Button>
  );
}