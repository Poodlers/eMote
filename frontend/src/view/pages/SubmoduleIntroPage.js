import React from 'react';
import { AppBar, Box, Button, Grid, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { Link } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import DownloadIcon from '@mui/icons-material/Download';

function SubmoduleIntroPage(props) {

    const module = props.module;
    const submodulesContent = props.submodulesContent;

  return (
        <>
        <Box sx={{mt:'120px', mb:'70px'}}>
          {submodulesContent.text ?
            <>
              <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                    {submodulesContent.text}
              </Typography>
              <Box sx ={{ p:3}} textAlign='center'>
                <Button component={Link} to={submodulesContent.exercicios.length == 0? module.feedbacklink : module.exerciselink} sx ={{ p:1, bgcolor: module.color1 }}>
                    <Typography gutterBottom color={"white"} sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' >
                        Preparada?
                    </Typography>
                </Button>
              </Box>
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

        </Box>
        </>
  );
}

export default SubmoduleIntroPage;
