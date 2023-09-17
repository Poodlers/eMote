import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Grid, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

import { IconButton, Typography, TextField, Autocomplete, MenuItem } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";

import Mindfulness from '../../../assets/images/mindfulness.png'
import Regulacao from '../../../assets/images/regulacao.png'
import Tolerancia from '../../../assets/images/tolerancia.png'

const modulesContent = [
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

const modules = [
    {
        module: 'Mindfulness',
        image: Mindfulness
    },
    {
        module: 'Regulação Emocional',
        image: Regulacao
    },
    {
        module: 'Tolerânica a estados emocionais dolorosos',
        image: Tolerancia
    },
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExercisesDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Box sx ={{p:1 }}>
        <Box sx ={{p:1, bgcolor: '#ec6fa7'}}>
            <Button sx={{textTransform: 'none'}} onClick={handleClickOpen}>
                <Grid container direction='column'>
                    <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                        Quais os exercícios que mais me ajudaram hoje?
                    </Typography>
                            
                    <ImageList
                        sx={{
                            justifyContent: 'center',
                            gridAutoFlow: "column",
                            gridTemplateColumns: "repeat(3,minmax(50px,160px)) !important",
                        }}
                        >                        
                        {modules.map(function(data, index) {
                            return (
                                <ImageListItem key={index} sx={{ pl:1 }} >
                                    <img style={{objectFit:'contain'}} alt={data.module} src={data.image} />
                                    <ImageListItemBar sx={{ 
                                        color: 'text.primary', 
                                        textAlign:'center',
                                        "& .MuiImageListItemBar-subtitle": { whiteSpace: 'pre-line', overflow: 'visible' }
                                        }} position='below' subtitle={data.module}/>
                                </ImageListItem>
                            )
                        })}
                    </ImageList>
                </Grid>
            </Button>
        </Box>
    </Box>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} color='secondary'>
          <Toolbar color='#ec6fa7' sx={{ minHeight: '80px' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, textAlign: 'center', fontSize:17 }} variant="h6" component="div">
                Quais os exercícios que mais me ajudaram hoje?
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              salvar
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx ={{pt:2, mt:2}}>
        
            {modulesContent.map(function(data, index) {
                return (
                    <Box sx ={{p:1, bgcolor: '#ec6fa7', alignSelf: 'center', width: '80%', m: '0 auto'}}>
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
                    </Box>
                )
            })}
        </Box>

      </Dialog>
    </div>
  );
}