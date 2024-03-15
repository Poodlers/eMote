import React, { useEffect, useState } from 'react';
import Modules from '../widgets/Modules.js';
import { Box, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import Diaries from '../widgets/Diaries.js';
import { NavBar } from '../widgets/NavBar.js';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const repository = RepositorySingleton.getInstance().injectRepository();
  const [componentState, setComponentState] = useState(ComponentState.LOADING);
  const [modulesList, setModulesList] = useState([]);
  const [areDiariesBlocked, setAreDiariesBlocked] = useState(true);
  useEffect(() => {
      repository.fetchModuloList().then((modules) => {
          setModulesList([...modules]);

          setComponentState(ComponentState.LOADED);
          if(!modules[1].isBlocked){
            setAreDiariesBlocked(false);
          }
          
      }).catch((error) => {
          console.log(error);
          setComponentState(ComponentState.ERROR);
          navigate('/', { replace: true });
      });

  }, []);

  

  return (
    <>
      {
        componentState == ComponentState.LOADING ?
        <Typography color="primary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
          Carregando...
        </Typography>
        :
        componentState == ComponentState.ERROR ?
          <Typography color="secondary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
            Erro ao carregar página
          </Typography>
          :
          <>
        <LogoAppBar/>
        
        <Box sx={{mt:'60px', mb:'70px', backgroundColor: '#fffefe' }}>
     
          <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} 
          variant="h4" align='center' color="primary">Bem-vinda à eMote!</Typography>
          <Box sx={{p:2}}>
            <Modules modulesList = {modulesList}/>
            <Diaries isBlocked={false} /* isBlocked = {areDiariesBlocked} */ /> 
          </Box>
        </Box>
        <NavBar/>
        </>

      }
      </>
  );
}

export default LandingPage;
