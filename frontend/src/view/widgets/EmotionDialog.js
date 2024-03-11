import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Grid, Stack, TextField } from '@mui/material';

import imgOutro from '../../assets/images/outro_.png'
import imgAborrecida from '../../assets/images/aborrecida.png';
import imgAnsiosa from '../../assets/images/ansiosa.png';
import imgCulpada from '../../assets/images/culpada.png';
import imgEnvergonhada from '../../assets/images/envergonhada.png';
import imgEntusiasmada from '../../assets/images/entusiasmada.png';
import imgFeliz from '../../assets/images/feliz.png';
import imgFrustrada from '../../assets/images/frustrada.png';
import imgFuriosa from '../../assets/images/furiosa.png';
import imgIrritada from '../../assets/images/irritada.png';
import imgMotivada from '../../assets/images/motivada.png';
import imgOrgulhosa from '../../assets/images/orgulhosa.png';
import imgSozinha from '../../assets/images/sozinha.png';
import imgTranquila from '../../assets/images/tranquila.png';
import imgTriste from '../../assets/images/triste.png';


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



export default function EmotionsDialog(props) {
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [outroFilled, setOutroFilled] = React.useState(false);
  const [outroValue, setOutroValue] = React.useState("");
  const emotionsSelected = props.emotionsSelected;
  const open = props.isOpen;
  const mainColor = props.mainColor;
  
  const handleClose = props.handleClickClose;
  const setEmotionsSelected = props.setEmotions;
  const canEdit = props.canEdit;

  
  const handleEmotionClick = (emotion) => {
    if (emotionsSelected.includes(emotion)) {
        setEmotionsSelected(emotionsSelected.filter((e) => e !== emotion));
   

    } else {
        setEmotionsSelected([...emotionsSelected, emotion]);
    }
  }

  const handleClickOpenPopUp = () => {
    if (outroFilled){
      setOutroFilled(false);
      handleEmotionClick(outroValue);
      setOutroValue("");
    }
    else {
      setOpenPopUp(true);
    }
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleAddOutro = (emotion) => {
      setOutroFilled(true);
      handleEmotionClick(emotion);
      setOpenPopUp(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} color='secondary'>
          <Toolbar color={mainColor} sx={{minHeight: '80px'}} >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
              Como me senti hoje?
            </Typography>
            { canEdit ? <Button autoFocus color="inherit" onClick={handleClose}>
              salvar
            </Button> : null}
         
          </Toolbar>
        </AppBar>

        <Dialog
        open={openPopUp}
        onClose={handleClosePopUp}
        >
        <AppBar sx={{ position: 'relative' }} color='secondary'>
          <Toolbar color='#ec6fa7' sx={{ minHeight: '80px' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleClosePopUp()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, textAlign: 'center', fontSize:17 }} variant="h6" component="div">
              Complete com o sentimento:
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack display="flex" direction="column" alignItems='center' justifyContent='center' sx={{ p:2 }}>
        <TextField
            id='outro'
            color='info'
            value={outroValue}
            fullWidth
            onChange={
              (event) => {
                  setOutroValue(event.target.value);
                }
              }
          />
          <Button color='secondary' 
          variant="contained" 
          onClick={() => handleAddOutro(outroValue)}>
              Salvar
          </Button>
        </Stack>
        </Dialog>

        <Box display="flex" alignItems='center' justifyContent='center' sx={{ m:2 }}>
          <Grid container spacing={1} textAlign={'center'}>
            <Grid item xs={4} key="outro">
              <IconButton
                color="info"
                disabled={!canEdit}
                sx ={{
                  ':disabled': { opacity: '50%',
                    backgroundColor: outroFilled ? mainColor : '#fff' },
                  backgroundColor: outroFilled ? mainColor : '#fff' ,
                '&:hover': {backgroundColor: outroFilled ? mainColor : '#fff' }}}
                onClick={() => canEdit ? handleClickOpenPopUp() : null}
                size="medium"
                >
                <img alt='outro' src={imgOutro}/>
              </IconButton>
            </Grid>
            {imageList.map(function(data, index) {
                return (
                    <Grid item xs={4} key= {data.feeling}>
                        <IconButton
                        color="info"
                        disabled={!canEdit}
                        sx ={{
                          ':disabled': { opacity: '50%',
                           backgroundColor: emotionsSelected.includes(data.feeling) ? mainColor : '#fff' },
                          backgroundColor: emotionsSelected.includes(data.feeling) ? mainColor : '#fff' ,
                        '&:hover': {backgroundColor: emotionsSelected.includes(data.feeling) ? mainColor : '#fff' }}}
                        onClick={() => canEdit ? handleEmotionClick(data.feeling) : null}
                        size="medium"
                        >
                        <img alt='logo' src={data.image}/>
                        </IconButton>
                    </Grid>
                )
            })}
            </Grid>
          </Box>

      </Dialog>
    </div>
  );
}