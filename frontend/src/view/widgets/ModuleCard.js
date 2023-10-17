import * as React from 'react';
import { Grid, Link, colors } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';

const colorCards = [
    [colors.deepOrange[100], colors.deepOrange[500]],
    [colors.indigo[100], colors.indigo[500]],
    [colors.deepPurple[100], colors.deepPurple[500]],
    [colors.cyan[100], colors.cyan[500]],
]

const links = [
  "/moduleintro/1",
  "/moduleintro/2",
  "/moduleintro/3",
  "/moduleintro/4"
]

const linksStarted = [
  "/submodulelist/1",
  "/submodulelist/2",
  "/submodulelist/3",
  "/submodulelist/4"
]

export default function ModuleCard(props) {
  return (
    <Link href={props.blocked ? '#':
    props.isStarted ? 
    linksStarted[props.index] :
    links[props.index]} underline="none">
    <Card sx={{ height:120, minWidth: 150, bgcolor: colorCards[props.index][0] }}>
      <CardContent>
        <Typography sx={{ fontSize: 11 }} color={colorCards[props.index][1]} >
          Módulo {props.index+1}
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
    </Link>
  );
}