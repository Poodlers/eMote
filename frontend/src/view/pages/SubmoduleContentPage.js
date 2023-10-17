import React from 'react';
import { AppBar, Box, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';



function SubmoduleContentPage(props) {
    const navigate = useNavigate();
    const [videoLoading, setVideoLoading] = React.useState(true);
    const module = props.module;
    const submodulesContent = props.submodulesContent;
    const subModuleNumber = props.subModuleNumber;
    const pageNumber = props.pageNumber;
    const isLastPage = props.isLastPage;
    const isModuleEnd = props.isModuleEnd;


    const saveFile = (file) => {
      console.log('saving!');
      saveAs(
        '/downloadable/'+ file,
        file
      );
    }

  return (
        <>
      
          {submodulesContent.text ?
            <>
              <Typography color={module.theme === "blue" ? module.color1 : "black" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                    {submodulesContent.text}
              </Typography>
              {pageNumber == 1 && !isLastPage ?
              <Box sx ={{ p:3}} textAlign='center'>
                <Button  onClick={() =>{
                   navigate(
                    isLastPage ? (isModuleEnd ? `/feedback/${module.moduloId}`:
                     `/submodulelist/${module.moduloId}/`)
                     : `/submodulepage/${module.moduloId}/${subModuleNumber}/${parseInt(pageNumber) + 1}`,
            
                   {replace: true}
                   )
                }} sx ={{ p:1, bgcolor: module.color1 }}>
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
                         src={'/images/'+ submodulesContent.imageFile} width='80%' />
                  </div>
                  </> : null}
                  {submodulesContent.videoFile ? 
                  <>
                  {
                    videoLoading ?
                    <Typography color={module.theme === "blue" ? module.color1 : "black" }
                     sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                      Carregando o vídeo...
                    </Typography>
                    :    
                    null
                    }               
                  <Grid container direction='row'>
                      <Grid item xs={12}  >
                          <ReactPlayer
                              onReady={() => setVideoLoading(false)}
                              style={{margin: '0 auto', display: videoLoading ? 'none' : 'block'}}
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
                      <Button
                          style={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500, color: module.color1 }}
                           
                          onClick={() => saveFile(submodulesContent.otherFile)} >
                      <Grid item >
                          <DownloadIcon sx={{ fontSize: 60 }} htmlColor='#f58d0c' />
                      </Grid>
                      <Grid item >
                        Download PDF
                      </Grid>
                    </Button>
                      
                    </Grid> : null}

            </Box>
          </Box>

        </>
  );
}

export default SubmoduleContentPage;
