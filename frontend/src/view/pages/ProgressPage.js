import React, { useState, useEffect }from 'react';
import { Box, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { ComponentState } from '../../models/ComponentState';
import { NavBar } from '../widgets/NavBar.js';
import { RepositoryInjector } from '../../repository/RepositoryInjector';
import EpisodesEmotions from '../widgets/ProgressPage/EpisodesEmotions.js';
import ModuleProgression from '../widgets/ProgressPage/ModuleProgression.js';
import EpisodesChart from '../widgets/ProgressPage/EpisodesChart.js';


function ProgressPage() {
  const repository = new RepositoryInjector().injectRepository();
  const [personalInfo, setPersonalInfo] = useState({});
  const [componentState, setComponentState] = useState(ComponentState.LOADING);

  const fetchInfo = () => {
      return repository.fetchPersonalPageInfo().then((response) => {
          setPersonalInfo(response);
          setComponentState(ComponentState.LOADED);
      }).catch((error) => {
          setComponentState(ComponentState.ERROR);
      });
    }
  
  
  useEffect(() => {
      fetchInfo();
      // eslint-disable-next-line
    }, []);
  
  return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 28, pt:2, mt:'70px' }} variant="h4" align='center' color="text.secondary">
              O Meu Progresso
            </Typography>
            {
                componentState === ComponentState.LOADING ? 
                <Typography sx={{ fontWeight: 'bold', fontSize: 18, mt:'10px' }} variant="h6" align='center' color="text.secondary">

                    A carregar...
                </Typography>
                :
                componentState === ComponentState.ERROR ?
                <Typography sx={{ fontWeight: 'bold', fontSize: 18, mt:'10px' }} variant="h6" align='center' color="text.secondary">
                    Ocorreu um erro ao carregar a página. Por favor, tente novamente mais tarde.
                </Typography>
                :
                <>
                <EpisodesChart episodesData = {personalInfo.episodesInfo} />
                <EpisodesEmotions emotionsData = {personalInfo.sentimentosInfo}/>
                <ModuleProgression progressInfo = {personalInfo.progressInfo} />
                </>
            }
            
        </Box>
        <NavBar/>
        </>
  );
}

export default ProgressPage;
