import React, { useEffect } from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { Link } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import { RepositorySingleton } from '../../repository/RepositoryInjector';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ante at ipsum mattis varius eget ornare ligula. Sed vitae dignissim leo, et ullamcorper dolor. Donec iaculis convallis tristique. Etiam libero eros, tempus non euismod eu, dignissim a dui. Nulla auctor mattis neque et molestie. Ut luctus massa ut purus viverra volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Sed varius urna tortor, blandit consequat lacus consequat eget. Nulla facilisi. '


function ModuleIntroductionPage(props) {
    const repository = RepositorySingleton.getInstance().injectRepository();

    useEffect(() => {
      const data = new Date().toLocaleString();
      console.log(data);
      repository.registerModuloTimeStamps(props.order ).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      } );
      // eslint-disable-next-line
    }
    , []);


    var module = null;

    for (const obj of modulesThemes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }
  return (

        <>
        <LogoAppBar color={module.theme}/>

        <Box sx={{mt:'60px', mb:'70px', backgroundColor: module.color2, height: '100vh'}}>
          <Box sx ={{p:3, bgcolor: module.color1, alignContent: 'center', width: '80%', m:'0 auto'}}>
            <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                {props.name}
            </Typography>
          </Box>
          <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                {lorem}
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
  );
}

export default ModuleIntroductionPage;
