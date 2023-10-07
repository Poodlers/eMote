import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Grid } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import DiaryLogo from '../../../assets/images/diario_emocoes_icon.png'
import imgAborrecida from '../../../assets/images/aborrecida.png';
import imgAnsiosa from '../../../assets/images/ansiosa.png';
import imgCulpada from '../../../assets/images/culpada.png';
import imgEnvergonhada from '../../../assets/images/envergonhada.png';
import imgEntusiasmada from '../../../assets/images/entusiasmada.png';
import imgFeliz from '../../../assets/images/feliz.png';
import imgFrustrada from '../../../assets/images/frustrada.png';
import imgFuriosa from '../../../assets/images/furiosa.png';
import imgIrritada from '../../../assets/images/irritada.png';
import imgMotivada from '../../../assets/images/motivada.png';
import imgOrgulhosa from '../../../assets/images/orgulhosa.png';
import imgSozinha from '../../../assets/images/sozinha.png';
import imgTranquila from '../../../assets/images/tranquila.png';
import imgTriste from '../../../assets/images/triste.png';
import EmotionsDialog from '../EmotionDialog';


    const imageList = [
        {
            feeling: 'Ansiosa',
            image: imgAnsiosa
        },
        {
            feeling: 'Aborrecida',
            image: imgAborrecida
        },
        {
            feeling: 'Culpada',
            image: imgCulpada
        },
        {
            feeling: 'Entusiasmada',
            image: imgEntusiasmada
        },
        {
            feeling: 'Envergonhada',
            image: imgEnvergonhada
        },        
        {
            feeling: 'Feliz',
            image: imgFeliz
        },
        {
            feeling: 'Frustrada',
            image: imgFrustrada
        },
        {
            feeling: 'Furiosa',
            image: imgFuriosa
        },
        {
            feeling: 'Irritada',
            image: imgIrritada
        },
        {
            feeling: 'Motivada',
            image: imgMotivada
        },
        {
            feeling: 'Orgulhosa',
            image: imgOrgulhosa
        },
        {
            feeling: 'Sozinha',
            image: imgSozinha
        },
        {
            feeling: 'Tranquila',
            image: imgTranquila
        },
        {
            feeling: 'Triste',
            image: imgTriste
        }
    ];

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