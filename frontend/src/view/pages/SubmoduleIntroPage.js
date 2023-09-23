import React from 'react';
import { AppBar, Box, Button, Grid, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { Link } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import DownloadIcon from '@mui/icons-material/Download';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu ante at ipsum mattis varius eget ornare ligula. Sed vitae dignissim leo, et ullamcorper dolor. Donec iaculis convallis tristique. Etiam libero eros, tempus non euismod eu, dignissim a dui. Nulla auctor mattis neque et molestie. Ut luctus massa ut purus viverra volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Sed varius urna tortor, blandit consequat lacus consequat eget. Nulla facilisi. '

const submodulesContent = {
  id:0,text:null,videoFile:"submod2.1_ativ1.pdf",
  imageFile:"submod2.1_ativ1.pdf",otherFile:'bla',
  exercicios:[{id:1,moduloNumberOrder:0,
  exercicioName:"Exercício 1 - Respiração diafragmática",
  exercicioFile:"submod2.1_ativ1.mp3"}, {id:2,moduloNumberOrder:0,
      exercicioName:"Exercício 1 - Respiração diafragmática",
      exercicioFile:"submod2.1_ativ1.pdf"}, {id:3,moduloNumberOrder:0,
          exercicioName:"Exercício 1 - Respiração diafragmática",
          exercicioFile:"submod2.1_ativ1.mp4"}]
}

function SubmoduleIntroPage(props) {
    var module = null;

    for (const obj of modulesThemes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }
  return (
    
        document.body.style = 'background:' + module.color2,
        <>
        <LogoAppBar color={module.theme} goBack={true}/>
        <AppBar sx ={{boxShadow: 'none', top: '60px', backgroundColor: module.color1 }} >
          <Box sx ={{p:5, pt:2, pb:2, alignContent: 'center', width: '80%', m:'0 auto'}}>
              <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                  {props.name}
              </Typography>
          </Box>
        </AppBar>

        <Box sx={{mt:'120px', mb:'70px'}}>
          {submodulesContent.text ?
            <>
              <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                    {submodulesContent.text}
              </Typography>
            </> : null}


          <Box sx= {{pt:1}} textAlign='center'>
            <Box sx= {{p:3}}>
                {submodulesContent.imageFile ?
                  <>
                  <div style={{ paddingBottom: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                        <img alt="imgFile" style={{ alignSelf: 'center' }} src={submodulesContent.imageFile} width='30%' />
                  </div>
                  </> : null}
                  {submodulesContent.videoFile ? 
                  <>
                  <Grid container direction='row'>
                      <Grid item xs={12}>
                          <video width="200" height="400" controls >
                              <source src={submodulesContent.videoFile}/>
                          </video>
                      </Grid>
                  </Grid>
                  </> : null}
                  {submodulesContent.otherFile ? 
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                      <Grid item >
                          <DownloadIcon sx={{ fontSize: 60 }} htmlColor='#f58d0c' />
                      </Grid>
                      <Grid item >
                          <Link style={{color:'white'}} to={submodulesContent.otherFile} download>Download exercício</Link>
                      </Grid>
                    </Grid> : null}

            </Box>
          </Box>

          <Box sx ={{ p:3}} textAlign='center'>
            <Button component={Link} to={submodulesContent.exercicios.length == 0? module.feedbacklink : module.exerciselink} sx ={{ p:1, bgcolor: module.color1 }}>
                <Typography gutterBottom color={"white"} sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' >
                    Preparada?
                </Typography>
            </Button>
          </Box>
        </Box>
        </>
  );
}

export default SubmoduleIntroPage;
