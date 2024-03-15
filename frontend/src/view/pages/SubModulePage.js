import React from 'react';
import { AppBar, Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar';

import { modulesThemes } from '../../constants/themes.js';
import phonesPurple from '../../assets/images/phones_rosa.png';
import phonesGreen from '../../assets/images/phones_verdes.png';
import phonesBlue from '../../assets/images/phones.png';

import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import MuiAudioPlayer from "mui-audio-player-plus";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoneIcon from '@mui/icons-material/Done';
import { ComponentState } from '../../models/ComponentState';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { NavBar } from '../widgets/NavBar';
import SubmoduleContentPage from './SubmoduleContentPage';
import withRouter from '../widgets/withRouter';
import ReactPlayer from 'react-player';



class SubModulePage extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        
        this.state = {
            componentState: ComponentState.LOADING,
            module: {},
            pageContent: {},
            exerciseIsFavorite: false,
            type :'' ,
            videoIsLoading: true,
            moduleNumber: this.props.router.params.moduleNumber,
            submoduleNumber: this.props.router.params.submoduleNumber,
            pageNumber: this.props.router.params.pageNumber,
        }

    }

    componentDidMount() {
        const repository = RepositorySingleton.getInstance().injectRepository();
        repository.getPageContent(this.props.router.params.moduleNumber, this.props.router.params.submoduleNumber,this.props.router.params.pageNumber).then((response) => {
            if(response.isBlocked){
                this.setState(
                    {componentState: ComponentState.NOT_ALLOWED});
                return;
            }
          for (const obj of modulesThemes) {
            if (obj.moduloId == this.state.moduleNumber) {
              this.setState({module: obj});
              break;
            }
          }
        
          this.setState(
                {pageContent: response});
          
         let exerciseIsFavorite = false;
         let type = ''
          console.log(response.exerciciosFavoritos);
          for(let i = 0; i < response.exerciciosFavoritos.length; i++){
            exerciseIsFavorite = response.exerciciosFavoritos[i].exercicioIsFavorite;
            type = response.exerciciosFavoritos[0].exercicioFile == undefined ? 'text' :
            response.exerciciosFavoritos[0].exercicioFile.split('.')[1] === 'mp4' ? 'video' : 'audio'
         }
          this.setState(
                {
                 type: type,
                exerciseIsFavorite: exerciseIsFavorite,
                componentState: ComponentState.LOADED
                }
            );
        
        
            
        }).catch((error) => {
            this.setState( { componentState: ComponentState.ERROR});
            console.log(error);
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.router.params.moduleNumber != this.props.router.params.moduleNumber ||
            prevProps.router.params.submoduleNumber != this.props.router.params.submoduleNumber ||
            prevProps.router.params.pageNumber != this.props.router.params.pageNumber){
                this.setState({moduleNumber: this.props.router.params.moduleNumber,
                    submoduleNumber: this.props.router.params.submoduleNumber,
                    pageNumber: this.props.router.params.pageNumber});
            }
    
        const repository = RepositorySingleton.getInstance().injectRepository();
        if (prevState.moduleNumber != this.state.moduleNumber ||
            prevState.submoduleNumber != this.state.submoduleNumber ||
            prevState.pageNumber != this.state.pageNumber) {  
               let objModule = {};
                repository.getPageContent(this.state.moduleNumber, this.state.submoduleNumber,this.state.pageNumber).then((response) => {
                    if(response.isBlocked){
                        this.setState(
                            {componentState: ComponentState.NOT_ALLOWED});
                        return;
                    }
                  for (const obj of modulesThemes) {
                    if (obj.moduloId == this.state.moduleNumber) {
                      
                        objModule = obj;
                        break;
                    }
                  }
                
                  
                  let exerciseIsFavorite = false;
                 
                  let type = ''
                  for(let i = 0; i < response.exerciciosFavoritos.length; i++){
                    exerciseIsFavorite = response.exerciciosFavoritos[i].exercicioIsFavorite;
                    type = response.exerciciosFavoritos[0].exercicioFile == undefined ? 'text' :
                    response.exerciciosFavoritos[0].exercicioFile.split('.')[1] === 'mp4' ? 'video' : 'audio'
                 }
           
                    
                  this.setState(
                        { 
                        type: type,
                        objModule: objModule,
                        exerciseIsFavorite: exerciseIsFavorite,
                        pageContent: response,
                        componentState: ComponentState.LOADED
                        }
                    );
                
                
                    
                }).catch((error) => {
                    this.setState( { componentState: ComponentState.ERROR});
                    console.log(error);
                });
            
           
        }
        if(prevState.exerciseIsFavorite != this.state.exerciseIsFavorite){   
            console.log('favoriting: ', this.state.moduleNumber, this.state.submoduleNumber, this.state.pageNumber, 
            this.state.exerciseIsFavorite);
            repository.manageFavoriteExercises(this.state.moduleNumber, this.state.submoduleNumber, 
                this.state.pageNumber, this.state.exerciseIsFavorite, 
            ).then((response) => {
                
            }
            ).catch((error) => {
                console.log(error);
            });
        }   
        
    }


    setFavorite = () => {
        this.setState({exerciseIsFavorite : !this.state.exerciseIsFavorite});
    }

   

    handleEndOfPage = () => {
        const repository = RepositorySingleton.getInstance().injectRepository();
        const nextPageLink =
        this.state.pageContent.isLastPageInModulo ?
        this.state.module.feedbacklink :
        this.state.pageContent.isLastPage ? 
        `/submodulelist/${this.props.router.params.moduleNumber}` :
        `/submodulepage/${this.props.router.params.moduleNumber}/${this.props.router.params.submoduleNumber}/${parseInt(this.props.router.params.pageNumber) + 1}`;
        
        const dataFim = new Date().toLocaleString().replace(',', '');
        
        if(this.state.pageContent.isLastPage){
            repository.registerSubModuloTimeStamps(this.state.moduleNumber, this.state.submoduleNumber, undefined,
            dataFim
            ).then((response) => {
                this.props.router.navigate(nextPageLink, { replace: true });
                
            }).catch((error) => {
                console.log(error);
            });

            
        }else{
            
            this.props.router.navigate(nextPageLink, { replace: true });
        }   

    }
    render() {
        
        return (
            <>
            {
                this.state.componentState == ComponentState.NOT_ALLOWED ?
                <Typography color="secondary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
                    Página bloqueada até completar o submodulo anterior
                </Typography>
                :
                this.state.componentState == ComponentState.LOADING ?
                <Typography color="primary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
                    Carregando...
                </Typography>
                :
                this.state.componentState == ComponentState.ERROR ?
                    <Typography color="secondary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
                        Erro ao carregar página 
                    </Typography>
                    :
                    <>
        <Box sx={{backgroundColor: this.state.module.color2, height : '100vh'}}>
            <LogoAppBar color={this.state.module.theme} goBack={true}/>
            <AppBar sx ={{boxShadow: 'none', top: '60px', height:'100px' , backgroundColor: this.state.module.color1}} >
                <Box sx ={{ alignContent: 'center', m: 'auto',}}>
                    <Typography align= 'center' sx={{ fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                        {this.state.pageContent.subModuleTitle}
                    </Typography>
                </Box>
            </AppBar>

            <Box sx={{mt:'140px', pb:10, backgroundColor: this.state.module.color2}}>

            <Box sx= {{pt:1, backgroundColor: this.state.module.color2 }} textAlign='center'>
                <SubmoduleContentPage 
                isLastPageInModulo={this.state.pageContent.isLastPageInModulo}
                isLastPage={this.state.pageContent.isLastPage} isModuleEnd = {this.state.pageContent.isLastPageInModulo}
                module={this.state.module} pageNumber={this.state.pageNumber} subModuleNumber={this.state.submoduleNumber} 
                submodulesContent={this.state.pageContent.subModulePage}/>
                {this.state.pageContent.subModulePage.exercicios.map((data, index) => {
                    
                    return (
                    <div key={index}>
                        <Box sx= {{pt:1}}> 
                            <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 22, fontWeight: 500 }} variant='body1' 
                            color={this.state.module.moduloId == 4 ? this.state.module.color1 : "white"}>
                                {data.exercicioName}
                            </Typography>
                        </Box>
                        <Box sx= {{p:3}}>
                            {
                                this.state.type === 'video' && this.state.videoIsLoading ?
                                <Typography color={this.state.module.theme === "blue" ? this.state.module.color1 : "black" }
                                sx={{p:1, pl:2.5, pt:2.5, fontSize: 20 }} variant='body1'>
                                    Carregando o vídeo...
                                </Typography>
                                : null
                            }
                            <Grid container direction='column'>
                            {
                                this.state.type === 'text' ?
                                <Typography color={this.state.module.theme === "blue" ? this.state.module.color1 : "black" }
                                sx={{whiteSpace: 'pre-line', p:1, px:5, pt:2.5, fontSize: 20, textAlign: 'justify' }} variant='body1'>
                                    <div dangerouslySetInnerHTML={{__html: data.exercicioTexto}} />
                                </Typography>

                                : this.state.type === 'video' ?
                                
                                <ReactPlayer
                                    onReady={() => this.setState({videoIsLoading: false})}
                                    style={{margin: '0 auto', display: this.state.videoIsLoading ? 'none' : 'block'}}
                                    url={'/videos/'+ data.exercicioFile}
                                    width={'auto'}
                                    height={'400px'}
                                    controls={true}
                                    playing={false}
                                    muted={false}
                                    onEnded={() => {  this.handleEndOfPage()  }}

                              />
                                : 
                                <>
                                <Grid item alignSelf={'center'}>
                                    <img alt='phones' src={
                                        this.state.module.theme === 'green'? phonesGreen 
                                        : this.state.module.theme === 'purple' ? phonesPurple 
                                        : phonesBlue}/>
                                </Grid>
                                <Grid item m={2} alignSelf={'center'} >
                                
                                <MuiAudioPlayer
                                containerSx = {{textAlign:'center', backgroundColor: this.state.module.color1, borderRadius: 10, p:1, 
                                '& .MuiSlider-root': {color: '#fff'},
                                '& .MuiIconButton-root': {color: '#fff'}}}
                                id="inline-timeline" display="timeline" inline paperize size='medium'
                                src={require(`../../assets/audios/${data.exercicioFile}`)} 
                                />
                            
                                </Grid>
                              </>
                            }
                             <Grid item m={2} alignSelf={'center'} >
                            <IconButton sx={{pt:4, pb:0}} size='large' onClick={()=>{this.setFavorite()}} >
                                
                                {this.state.exerciseIsFavorite ? 
                                <FavoriteIcon sx={{ fontSize: 60 }} htmlColor={this.state.module.color1} />
                                :
                                <FavoriteBorderIcon sx={{ fontSize: 60 }} htmlColor={this.state.module.color1 } /> }
                            </IconButton>
                            <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 18, fontWeight: 500  }} variant='body1' color={this.state.module.color1}>
                                    Favoritos
                            </Typography>
                            
                            </Grid>
                           </Grid>

                            
                        </Box>
                    </div>
                    )
                })}


            </Box>
            {
                (this.state.pageContent.subModulePage.imageFile || 
                this.state.pageContent.subModulePage.otherFile || 
                this.state.pageContent.subModulePage.exercicios.length > 0 ||
                this.state.pageContent.subModulePage.videoFile) &&
                !this.state.pageContent.isLastPage ?
                    <Button onClick={this.handleEndOfPage} 
                    sx={{ bottom:"5%", left:"60%", backgroundColor: this.state.module.color1, 
                    "&:hover": {backgroundColor: this.state.module.color3} }} variant="contained" endIcon={< ArrowForwardIosIcon/>}>
                    Próximo
                    </Button>
                : this.state.pageContent.isLastPage ?
                    <Button onClick={this.handleEndOfPage} 
                    sx={{ bottom:"5%", left:"60%", backgroundColor: this.state.module.color1, 
                    "&:hover": {backgroundColor: this.state.module.color3} }} variant="contained" endIcon={< DoneIcon/>}>
                    Concluir
                    </Button>
                : null
            }
                
            </Box>
            <NavBar color={this.state.module.theme}/>
            </Box>
        
            </>
                    
                
            }
            </>
            

        );
    }
}

export default withRouter(SubModulePage);