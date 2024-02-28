import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { Box, Grid } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import EmotionsDialog from '../EmotionDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmotionDiaryEmotions(props) {
  const [open, setOpen] = React.useState(false);
  const emotionsSelected = props.emotionsSelected;
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
    <Box sx ={{p:1 }}>
            <Box sx ={{p:1, bgcolor: '#ec6fa7'}}>
                <Grid container sx={{ p: 0.5 }} direction="row" justifyContent="center">
                    <Button sx={{textTransform: 'none'}} onClick={handleClickOpen}>
                        <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                            Como me senti hoje?
                        </Typography>
                        <KeyboardArrowRightIcon fontSize='large' htmlColor='#fff'/>
                    </Button>
                </Grid>
            </Box>
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