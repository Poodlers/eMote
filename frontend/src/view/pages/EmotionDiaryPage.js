import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import DiaryLogo from '../../assets/images/diario_emocoes.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import ReflexionForm from '../widgets/EmotionsDiary/ReflexionForm';
import EmotionsDialog from '../widgets/EmotionsDiary/EmotionsPrompt';
import ExercisesDialog from '../widgets/EmotionsDiary/ExercisesDialog';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';


function EmotionDiaryPage() {
  const navigate = useNavigate();
  const repository = RepositorySingleton.getInstance().injectRepository();
  const [hasAccess, setHasAccess] = React.useState(false);
  const [hasAlreadyFilled, setHasAlreadyFilled] = React.useState(false);
  const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
  const [emotionsSelected, setEmotionsSelected] = React.useState([]);
  const [exercisesSelected, setExercisesSelected] = React.useState([]);
  const [exercisesContent, setExercisesContent] = React.useState({});
  const [dayReflection, setDayReflection] = React.useState('');

  const handleSubmit = () => {
    repository.saveEmotionDiary(emotionsSelected, exercisesSelected, dayReflection).then((response) => {
      console.log(response);
      navigate('/home');
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    repository.hasAccessToDiaries().then((response) => {
      setHasAccess(true); // setHasAccess(response); if we want to go back to the original logic
      repository.checkIfEmotionDiaryIsAlreadyAdded().then((response) => {
        if(!response){
          setHasAlreadyFilled(false);
        }else{
          setHasAlreadyFilled(true);
          setDayReflection(response.reflexaoEmotion);
          setEmotionsSelected(response.sentimentos);
          setExercisesSelected(response.exercicios);       
        }
        

        repository.fetchAllSeenExercises().then((response) => {
          setExercisesContent({...response});
          
        }
        ).catch((error) => {
          throw error;
        });


      }).catch((error) => {
        throw error;
      });


      
      repository.fetchAllSeenExercises().then((response) => {
        setExercisesContent({...response});
        setComponentState(ComponentState.LOADED);
      }).catch((error) => {
        throw error;
      });
      
    }).catch((error) => {
      console.log(error);
      setComponentState(ComponentState.ERROR);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{backgroundColor: '#e6d4e0', height:'100vh'}}>
      <IconButton component={Link} to="/home" aria-label="back" size="large">
          <ArrowBackIosIcon color= "secondary" fontSize="inherit" />
      </IconButton>
    {
      componentState === ComponentState.LOADING ?
        <Typography color="primary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
          Carregando...
        </Typography>
        :
        componentState === ComponentState.ERROR ?
          <Typography color="error" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
            Erro ao carregar página
          </Typography>
          :
          hasAccess ?
          <>
       
          
              <div style={{ paddingBottom: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                  <img alt="logo" style={{ alignSelf: 'center' }} src={DiaryLogo} width='30%'/>
              </div>

              <Typography gutterBottom sx={{ pb:1, textAlign: 'center', fontSize: 17, fontWeight: 500, color: "#e7007f" }} variant='body1'>
                  Diário das Emoções
              </Typography>
            <Box sx={{p:2 , backgroundColor: '#e6d4e0'}}>
              <EmotionsDialog 
              canEdit={!hasAlreadyFilled} emotionsSelected={emotionsSelected} setEmotions= {setEmotionsSelected}/>
              <ExercisesDialog canEdit={!hasAlreadyFilled} possibleExercises={exercisesContent} exercisesSelected={exercisesSelected} setExercises = {setExercisesSelected} />
              <ReflexionForm canEdit={!hasAlreadyFilled} dayReflection={dayReflection} setDayReflection={setDayReflection}/>

           
                {
                  hasAlreadyFilled ? null :
                  <Box sx ={{ p:3 }} textAlign='center'>
                  <Button onClick={handleSubmit} sx ={{ p:1, bgcolor: '#ec6fa7' }}>
                    <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                        Confirmar
                    </Typography>
                  </Button>
                  </Box>
                }
              
              
            </Box>
          
        </>
        :
        <Typography gutterBottom sx={{ pb:1, textAlign: 'center', fontSize: 25, fontWeight: 500, color: "#e7007f" }} variant='body1' >
           Para acederes ao diário das emoções, completa o primeiro módulo - "Psicoeducação"
        </Typography>
            

    }
    </Box>

        
  );
}


export default EmotionDiaryPage;
