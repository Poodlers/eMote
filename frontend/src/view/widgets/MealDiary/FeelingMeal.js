import * as React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { Box, Grid } from '@mui/material';

import button from '../../../assets/images/botao_comosenti.png';
import EmotionsDialog from '../EmotionDialog';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FeelingMeal(props) {
  const [open, setOpen] = React.useState(false);
  const emotionsSelected = props.initialValue;
  const setEmotionsSelected = props.setEmotions;
  const canEdit = props.canEdit;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Box >
        <Grid container sx={{ p: 0.5, placeItems:"center" }} direction="row" >
          <Button sx={{textTransform: 'none'}} onClick={handleClickOpen}>
            <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
              Como me senti
            </Typography>
            <Box sx ={{pl: 1 }}>
              <img alt='button' height='30px' src={button}/>
            </Box>
          </Button>
        </Grid>
    </Box>

    <EmotionsDialog 
    isOpen = {open} 
    mainColor = '#ec6fa7' 
    handleClickClose = {handleClose}
    canEdit={canEdit} 
            emotionsSelected={emotionsSelected} setEmotions={setEmotionsSelected} ></EmotionsDialog>
    </div>
  );
}