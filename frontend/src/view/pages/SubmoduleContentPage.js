import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';
import { RepositorySingleton } from '../../repository/RepositoryInjector';



function SubmoduleContentPage(props) {
    const navigate = useNavigate();
    const [videoLoading, setVideoLoading] = React.useState(true);
    const module = props.module;
    const isLastPageInModulo = props.isLastPageInModulo;
    const submodulesContent = props.submodulesContent;
    const subModuleNumber = props.subModuleNumber;
    const pageNumber = props.pageNumber;
    const isLastPage = props.isLastPage;
    const isModuleEnd = props.isModuleEnd;

    const handleEndOfPage = () => {
      const repository = RepositorySingleton.getInstance().injectRepository();
      const nextPageLink =
      isLastPageInModulo ?
      module.feedbacklink :
      isLastPage ? 
      `/submodulelist/${module.moduloId}` :
      `/submodulepage/${module.moduloId}/${subModuleNumber}/${parseInt(pageNumber) + 1}`;
      
      const dataFim = new Date().toLocaleString().replace(',', '');
      
      if(isLastPage){
          repository.registerSubModuloTimeStamps(module.moduloId, subModuleNumber, undefined,
          dataFim
          ).then((response) => {
              navigate(nextPageLink, { replace: true });
              
          }).catch((error) => {
              console.log(error);
          });

          
      }else{
          navigate(nextPageLink, { replace: true });
      }   

  }
    const saveFile = (file) => {
      console.log('saving!');
      saveAs(
        '/downloadable/'+ file,
        file
      );
    }

  return (
        <>
        <Box sx={{ backgroundColor: module.color2 }}>
          {submodulesContent.text ?
            <>
              <Box sx={{ width: '80%', alignContent: 'center', m: '0 auto'}}>
                <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{
                  whiteSpace: 'pre-line',
                  p:1, pl:2.5, pt:2.5, fontSize: 20, textAlign: 'start' }} variant='body1'>
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
              </Box>
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
                              onEnded={() => {handleEndOfPage()
                            }}

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
                        Descarregar Modelo
                      </Grid>
                    </Button>
                      
                    </Grid> : null}

            </Box>
          </Box>
        </Box>
        </>
  );
}

export default SubmoduleContentPage;
