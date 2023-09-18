import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { RepositorySingleton } from './repository/RepositoryInjector';
import myTheme from './theme.js'

import LandingPage from './view/pages/LandingPage.js';
import FavoritesPage from './view/pages/FavoritesPage.js';
import ProgressPage from './view/pages/ProgressPage.js';
import ProfilePage from './view/pages/ProfilePage.js';
import SocialMediaPage from './view/pages/SocialMediaPage.js';
import PsychApptPage from './view/pages/PsychApptPage.js';
import ContactPage from './view/pages/ContactPage.js';
import EmotionDiaryPage from './view/pages/EmotionDiaryPage.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import EmotionsPage from './view/pages/EmotionsPage.js';
import ExercisesPage from './view/pages/ExercisesPage.js';
import MealDiaryPage from './view/pages/MealDiaryPage.js';
import MealTemplatePage from './view/pages/MealTemplatePage.js';
import ModuleIntroductionPage from './view/pages/ModuleIntroductionPage.js';
import SubmoduleListPage from './view/pages/SubmoduleListPage.js';
import SubmoduleIntroPage from './view/pages/SubmoduleIntroPage.js';
import SubmoduleExercisePage from './view/pages/SubmoduleExercisePage.js';
import LoginPage from './view/pages/LoginPage.js';
import AdminPage from './view/pages/AdminPage.js';


const repository = RepositorySingleton.getInstance().injectRepository();
const theme = myTheme;


function App() {
  //ping backend every 30 seconds to log user access
  const pingInterval = 30;
  useEffect(() => {
    
    const interval = setInterval(() => {
      repository.logAccessToApp().catch((error) => {
          console.log(error);
      });
    }, pingInterval * 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/home' element={<LandingPage />} />
        <Route path='/favorites' element={< FavoritesPage/>} />
        <Route path='/progress' element={< ProgressPage/>} />
        <Route path='/profile' element={< ProfilePage/>} />
        <Route path='/socialmedia' element={< SocialMediaPage/>} />
        <Route path='/appts' element={< PsychApptPage/>} />
        <Route path='/contact' element={< ContactPage/>} />

        <Route path='/emotiondiary' element={< EmotionDiaryPage/>} />
        <Route path='/emotions' element={< EmotionsPage/>} />
        <Route path='/exercises' element={< ExercisesPage/>} />
        <Route path='/emotionsmeal' element={< EmotionsPage/>} />
        
        <Route path='/mealdiary' element= {<MealDiaryPage/>} />
        <Route path='/pqnoalmoco' element= {<MealTemplatePage meal='Pequeno Almoço'/>} />
        <Route path='/lanchemanha' element= {<MealTemplatePage meal='Lanche da Manhã'/>} />
        <Route path='/almoco' element= {<MealTemplatePage meal='Almoço'/>} />
        <Route path='/lanche' element= {<MealTemplatePage meal='Lanche da Tarde'/>} />
        <Route path='/jantar' element= {<MealTemplatePage meal='Jantar'/>} />
        <Route path='/ceia' element= {<MealTemplatePage meal='Ceia'/>} />
        <Route path='/outraref' element= {<MealTemplatePage meal='Outra Refeição'/>} />
      
        <Route path='/psicoeducacao' element= {<ModuleIntroductionPage name='Psicoeducação'/>} />
        <Route path='/mindfulness' element= {<ModuleIntroductionPage name='Mindfulness'/>} />
        <Route path='/regulacao' element= {<ModuleIntroductionPage name='Regulação emocional'/>} />
        <Route path='/tolerancia' element= {<ModuleIntroductionPage name='Tolerância a estados emocionais dolorosos'/>} />


        <Route path='/module1' element= {<SubmoduleListPage name='Psicoeducação'/>} />
        <Route path='/module2' element= {<SubmoduleListPage name='Mindfulness'/>} />
        <Route path='/module3' element= {<SubmoduleListPage name='Regulação emocional'/>} />
        <Route path='/module4' element= {<SubmoduleListPage name='Tolerância a estados emocionais dolorosos'/>} />
       
        <Route path='/submoduleintro1' element= {<SubmoduleIntroPage name='Psicoeducação'/>} />
        <Route path='/submoduleexercise1' element= {<SubmoduleExercisePage name='Psicoeducação'/>} />
        <Route path='/submoduleintro2' element= {<SubmoduleIntroPage name='Mindfulness'/>} />
        <Route path='/submoduleexercise2' element= {<SubmoduleExercisePage name='Mindfulness'/>} />
        <Route path='/submoduleintro3' element= {<SubmoduleIntroPage name='Regulação emocional'/>} />
        <Route path='/submoduleexercise3' element= {<SubmoduleExercisePage name='Regulação emocional'/>} />
        <Route path='/submoduleintro4' element= {<SubmoduleIntroPage name='Tolerância a estados emocionais dolorosos'/>} />
        <Route path='/submoduleexercise4' element= {<SubmoduleExercisePage name='Tolerância a estados emocionais dolorosos'/>} />


      </Routes>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
