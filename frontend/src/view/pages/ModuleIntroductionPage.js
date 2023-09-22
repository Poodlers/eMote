import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { Link, useParams } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';


function ModuleIntroductionPage(props) {
    let { moduleNumber } = useParams();
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const repository = RepositorySingleton.getInstance().injectRepository();
    const [moduloName, setModuloName] = React.useState('');
    const [moduloIntroText, setModuloIntroText] = React.useState('');
    var module = null;

    useEffect(() => {
      const data = new Date().toLocaleString().replace(',', '');
      console.log(data);

      repository.fetchModuloNameAndIntro(moduleNumber).then((response) => {
        setModuloName(response.title);
        setModuloIntroText(response.introText);
      }).catch((error) => {
        console.log(error);
        setComponentState(ComponentState.ERROR);
      });

      for (const obj of modulesThemes) {
        if (obj.name === moduloName) {
            module = obj;
        }
      }
    
      repository.registerModuloTimeStamps(moduleNumber ).then((response) => {
        console.log(response);
        setComponentState(ComponentState.LOADED);
      }).catch((error) => {
        console.log(error);
        setComponentState(ComponentState.ERROR);
      } );

      
      // eslint-disable-next-line
    }
    , []);



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
            <LogoAppBar color={module.theme}/>
            <Box sx={{mt:'60px', mb:'70px', backgroundColor: module.color2, height: '100vh'}}>
              <Box sx ={{p:3, bgcolor: module.color1, alignContent: 'center', width: '80%', m:'0 auto'}}>
                <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                    {moduloName}
                </Typography>
              </Box>
              <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                    {moduloIntroText}
                </Typography>
              <Box sx ={{ p:3}} textAlign='center'>
                <Button component={Link} to={module.link} sx ={{ p:1, bgcolor: module.color1 }}>
                    <Typography gutterBottom color={"white"} sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' >
                        Vamos começar?
                    </Typography>
                </Button>
              </Box>
          </Box>
          <NavBar color={module.theme}/>
          </>
        }

        

        
        </>
  );
}

export default ModuleIntroductionPage;
