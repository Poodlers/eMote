import React from 'react';
import { Box, IconButton, Typography, TextField, Autocomplete, MenuItem, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import CheckIcon from "@mui/icons-material/Check";

import Mindfulness from '../../assets/images/mindfulness.png'
import Regulacao from '../../assets/images/regulacao.png'
import Tolerancia from '../../assets/images/tolerancia.png'

const modules = [
    {
        module: 'Mindfulness',
        image: Mindfulness,
        exercises: [
          "Respiração diafragmática",
          "Santiago Solis",
          "Dawid Floyd",
          "Mateo Barlow",
          "Samia Navarro",
          "Kaden Fields",
          "Genevieve Watkins",
          "Mariah Hickman",
          "Rocco Richardson",
          "Harris Glenn"
        ]
    },
    {
        module: 'Regulação Emocional',
        image: Regulacao,
        exercises: [
          "Humaira Sims",
          "Santiago Solis",
          "Dawid Floyd",
          "Mateo Barlow",
          "Samia Navarro",
          "Kaden Fields",
          "Genevieve Watkins",
          "Mariah Hickman",
          "Rocco Richardson",
          "Harris Glenn"
        ]
    },
    {
        module: 'Tolerânica a estados emocionais dolorosos',
        image: Tolerancia,
        exercises: [
          "Humaira Sims",
          "Santiago Solis",
          "Dawid Floyd",
          "Mateo Barlow",
          "Samia Navarro",
          "Kaden Fields",
          "Genevieve Watkins",
          "Mariah Hickman",
          "Rocco Richardson",
          "Harris Glenn"
        ]
    },
]

function ExercisesPage() {
  return (
    document.body.style = 'background: #e6d4e0',
      <Box sx={{mt:'10px', mb:'10px' }}>
          <IconButton component={Link} to="/emotiondiary" aria-label="back" size="large">
              <ArrowBackIosIcon color= "secondary" fontSize="inherit" />
          </IconButton>
          <Box sx ={{p:1, bgcolor: '#ec6fa7', alignSelf: 'center', width: '80%', m: '0 auto'}}>
              <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
              Quais os exercícios que mais me ajudaram hoje?
              </Typography>
          </Box>
          <Box sx ={{ p:1 }}></Box>
        <Box sx ={{p:1, bgcolor: '#ec6fa7', alignSelf: 'center', width: '80%', m: '0 auto'}}>
                    
            {modules.map(function(data, index) {
                return (
                  <Grid
                  sx={{placeItems:"center", justifyContent: 'center', alignItems: 'center'}}>
                        <img style={{ width: '30%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} alt={data.module} src={data.image} />
                        <Typography color='text.primary' sx={{ textAlign: 'center' }}>{data.module} </Typography>
                    <Autocomplete
                    sx={{ m: 1 }}
                    multiple
                    options={data.exercises}
                    getOptionLabel={(option) => option}
                    disableCloseOnSelect
                    ChipProps={{color:"success"}}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <MenuItem
                        {...props}
                        key={option}
                        value={option}
                        sx={{ color:"#ec6fa7" }}
                        >
                        {option}
                        {selected ? <CheckIcon /> : null}
                        </MenuItem>
                    )}
                    />
                    </Grid>
                )
            })}
            </Box>
      </Box>
  );
}

export default ExercisesPage;
