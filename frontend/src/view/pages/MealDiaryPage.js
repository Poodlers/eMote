import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DiaryLogo from '../../assets/images/refeicoes_icon.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import MealButton from '../widgets/MealDiary/MealButton';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';
import { useEffect } from 'react';

function MealDiaryPage() {
  const repository = RepositorySingleton.getInstance().injectRepository();
  const [hasAccess, setHasAccess] = React.useState(false);
  const [componentState, setComponentState] = React.useState(ComponentState.LOADING);

  useEffect(() => {
    repository.hasAccessToDiaries().then((response) => {
      setHasAccess(response);
      setComponentState(ComponentState.LOADED);
    }).catch((error) => {
      console.log(error);
      setComponentState(ComponentState.ERROR);
    });
    // eslint-disable-next-line
  }, []);
  return (
    document.body.style = 'background: #01698b',

        <Box sx={{mt:'10px', mb:'10px' }}>

        <IconButton component={Link} to="/home" aria-label="back" size="large">
          <ArrowBackIosIcon htmlColor= "#349db7" fontSize="inherit" />
        </IconButton>
        {
          componentState === ComponentState.LOADING ?
          <Typography color="primary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
            Carregando...
          </Typography>
          :
          componentState === ComponentState.ERROR ?
            <Typography color="secondary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
              Erro ao carregar página
            </Typography>
            :
            hasAccess ?
            <>
            <div style={{ paddingBottom: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                  <img alt="logo" style={{ alignSelf: 'center' }} src={DiaryLogo} width='30%' />
              </div>
            <Typography gutterBottom sx={{ pb:1, textAlign: 'center', fontSize: 17, fontWeight: 500 }} variant='body1' color={"white"}>
                Diário das Refeições
            </Typography>
            <Box sx={{p:2}}>
              <MealButton meal= "Pequeno Almoço" href="/pqnoalmoco"/>
              <MealButton meal= "Lanche da Manhã" href="/lanchemanha"/>
              <MealButton meal= "Almoço" href="/almoco"/>
              <MealButton meal= "Lanche da Tarde" href="/lanche" />
              <MealButton meal= "Jantar" href="/jantar" />
              <MealButton meal= "Ceia" href="/ceia"/>
              <MealButton meal= "Outra Refeição" href="/outraref"/>
            </Box>

            </>
            :
            <Typography gutterBottom sx={{ pb:1, textAlign: 'center', fontSize: 25, fontWeight: 500, color: "#ffffff" }} variant='body1' >
           Para acederes ao diário das refeições, completa o primeiro módulo - "Psicoeducação"
            </Typography>
        }


            
        </Box>
        
  );
}

export default MealDiaryPage;
