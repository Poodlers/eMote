import React, { useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar';

import { modulesThemes } from '../../constants/themes.js';
import { Link, useParams } from 'react-router-dom';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';


function SubmoduleExercisePage(props) {
    let {moduleNumber, submoduleNumber, pageNumber} = useParams();
    const repository = RepositorySingleton.getInstance().injectRepository();
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const [pageContent, setPageContent] = React.useState({});
    const [module, setModule] = React.useState({});

   

    useEffect(() => {
        repository.getPageContent(moduleNumber, submoduleNumber,pageNumber).then((response) => {
          for (const obj of modulesThemes) {
            if (obj.moduloId == moduleNumber) {
              setModule(obj);
              break;
            }
          }
          setPageContent(response);
          setComponentState(ComponentState.LOADED);
          console.log(response);
        }).catch((error) => {
            setComponentState(ComponentState.ERROR);
            console.log(error);
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
             <LogoAppBar color={module.theme} goBack={true} />

              <Box sx={{mt:'60px', mb:'70px', backgroundColor: module.color2, height: '100vh'} }>
                <Box sx ={{p:5, pt:2, pb:2, bgcolor: module.color1, alignContent: 'center', width: '80%', m:'0 auto'}}>
                  <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                      {props.name}
                  </Typography>
                </Box>

                <Box sx= {{pt:1}} textAlign='center'>
                  {/* exercício é mostrado aqui */}
                </Box>
                
                  <IconButton component={Link} to={module.feedbacklink} 
                      sx={{ bottom: "5%",
                          left: "70%",
                          position: "absolute" }}
                  >
                      <img alt='check' src={module.check}/>

                  </IconButton>
              </Box>

            </>
    }

   
    </>

  );
}

export default SubmoduleExercisePage;
