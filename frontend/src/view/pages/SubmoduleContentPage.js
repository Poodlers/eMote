import React from 'react';
import { AppBar, Box, Button, Grid, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { Link, useNavigate } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';


function SubmoduleContentPage(props) {
    const navigate = useNavigate();
    const module = props.module;
    const submodulesContent = props.submodulesContent;
    const subModuleNumber = props.subModuleNumber;
    const pageNumber = props.pageNumber;
    console.log("pageNumber: " + pageNumber)

  return (
        <>
      
          {submodulesContent.text ?
            <>
              <Typography color={module.theme === "blue" ? module.color1 : "black" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                    {submodulesContent.text}
              </Typography>
              {pageNumber === 1 ?
              <Box sx ={{ p:3}} textAlign='center'>
                <Button  onClick={() =>
                   navigate( `/submodulepage/${module.moduloId}/${subModuleNumber}/${pageNumber + 1}`,
                   {replace: true}
                   )} sx ={{ p:1, bgcolor: module.color1 }}>
                    <Typography gutterBottom color={"white"} sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' >
                        Preparada?
                    </Typography>
                </Button>
              </Box> 
            : null}
            
            </> : null}
          <Box sx= {{pt:1}} textAlign='center'>
            <Box sx= {{p:3}}>
                {submodulesContent.imageFile ?
                  <>
                  <div style={{ paddingBottom: 10, display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                        <img alt="imgFile" style={{ alignSelf: 'center' }}
                         src={'/images/'+ submodulesContent.imageFile} width='30%' />
                  </div>
                  </> : null}
                  {submodulesContent.videoFile ? 
                  <>
                  <Grid container direction='row'>
                      <Grid item xs={12}  >
                          <ReactPlayer
                              style={{margin: '0 auto'}}
                              url={'/videos/'+ submodulesContent.videoFile}
                              width={'auto'}
                              height={'400px'}
                              controls={true}
                              playing={false}
                              muted={false}
                              />
                          
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

        </>
  );
}

export default SubmoduleContentPage;
