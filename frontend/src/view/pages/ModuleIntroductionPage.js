import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';


function ModuleIntroductionPage(props) {
    let { moduleNumber } = useParams();
    const navigate = useNavigate();
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const repository = RepositorySingleton.getInstance().injectRepository();
    const [moduloName, setModuloName] = React.useState('');
    const [moduloIntroText, setModuloIntroText] = React.useState('');
    const [module, setModule] = React.useState({});

    useEffect(() => {
      const data = new Date().toLocaleString().replace(',', '');
      console.log(data);

      repository.fetchModuloNameAndIntro(moduleNumber).then((response) => {
        setModuloName(response.title);
        setModuloIntroText(response.introText);
        for (const obj of modulesThemes) {
          
          if (obj.name === response.title) {
            setModule(obj);
            break;
          }
        }
        setComponentState(ComponentState.LOADED);
        console.log(response);  
      }).catch((error) => {
        console.log(error);
        setComponentState(ComponentState.ERROR);
      });

      
    


      
      // eslint-disable-next-line
    }
    , []);

    const onSubmit = () => {
      const dataInicio = new Date().toLocaleString().replace(',', '');
      console.log(dataInicio);
      repository.registerModuloTimeStamps(moduleNumber,dataInicio).then((response) => {
        console.log(response);
        navigate(`/submodulelist/${moduleNumber}`, { replace: true });

      }).catch((error) => {
        console.log(error);
        
      } );
    }



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
              <Box sx={{ width: '80%', alignContent: 'center', m: '0 auto'}}>
              <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                    {moduloIntroText}
                </Typography>
              </Box>
              <Box sx ={{ p:3}} textAlign='center'>
                <Button onClick={onSubmit} sx ={{ p:1, bgcolor: module.color1 }}>
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
