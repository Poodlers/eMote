import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

import imgCasa from '../../../assets/images/casa.png';
import imgRestaurante from '../../../assets/images/restaurantecafe.png';
import imgFaculdade from '../../../assets/images/faculdadeescola.png';
import imgTrabalho from '../../../assets/images/trabalho.png';
import imgOutro from '../../../assets/images/outro.png';
import imgAmigos from '../../../assets/images/casadeamigos.png';


const imageList = [
        {
            location: 'Casa',
            image: imgCasa
        },
        {
            location: 'Restaurante/Café',
            image: imgRestaurante
        },
        {
            location: 'Faculdade/Escola',
            image: imgFaculdade
        },
        {
            location: 'Trabalho',
            image: imgTrabalho
        },
        {
            location: 'Casa de amigos',
            image: imgAmigos
        },
        {
            location: 'Outro',
            image: imgOutro
        }
    ];


export default function LocationMeal(props) {
  
  const locationSelected = props.initialValue;
  const mainColor = props.mainColor;
  
  const setLocationSelected = props.setLocation;
  const canEdit = props.canEdit;

  const handleEmotionClick = (emotion) => {
    console.log(emotion)
    if (locationSelected == emotion) {
        setLocationSelected("");
    } else {
        setLocationSelected(emotion);
    }
    console.log(locationSelected)
  }


  return (
    <div>
        <Box >
            <Grid container sx={{ p: 0.5, placeItems:"center" }} direction="row" >
                <Typography gutterBottom sx={{ pt:1, pl:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                Onde comi?
                </Typography>
            </Grid>
        </Box>
        <Box display="flex" alignItems='center' justifyContent='center'>
          <Grid container textAlign={'center'}>
            {imageList.map(function(data, index) {
                return (
                    <Grid item xs={3} key= {data.location}>
                        <IconButton
                        color="info"
                        disabled={!canEdit}
                        sx ={{
                            ':disabled': { opacity: '50%',
                            backgroundColor: locationSelected == index ? '#fff' : mainColor
                            },
                            backgroundColor: locationSelected == index ? '#fff' : mainColor,
                            '&:hover': {backgroundColor: locationSelected == index ? '#fff' : mainColor},
                        p:0.5}}
                        onClick={() => canEdit ? handleEmotionClick(index): null}
                        >
                        <img alt='location' src={data.image}/>
                        </IconButton>
                    </Grid>
                )
            })}
            </Grid>
        </Box>
    </div>
  );
}