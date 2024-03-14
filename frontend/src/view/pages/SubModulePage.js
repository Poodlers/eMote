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



class SubModulePage extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        
        this.state = {
            componentState: ComponentState.LOADING,
            module: {},
            pageContent: {},
            exercisesObj: {},
            audioRefs: [],
            moduleNumber: this.props.router.params.moduleNumber,
            submoduleNumber: this.props.router.params.submoduleNumber,
            pageNumber: this.props.router.params.pageNumber,
        }

    }
    togglePlay = (audioFile) => {

        let audioRefsCopy = this.state.audioRefs;
        
        for(let i = 0; i < audioRefsCopy.length; i++){
          
            if(audioRefsCopy[i].audioFile == audioFile){
                audioRefsCopy[i].isPlaying = !audioRefsCopy[i].isPlaying;
                if(audioRefsCopy[i].isPlaying){ 
                    // pause the other audios
                    for(let j = 0; j < audioRefsCopy.length; j++){
                        if(audioRefsCopy[j].audioFile !== audioFile){
                            audioRefsCopy[j].isPlaying = false;
                            
                        }
                    } 
                      
                }
                break;
            }
        }    
        this.setState({audioRefs : [...audioRefsCopy]});
      
    
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
          
          let exercises = {};
          let audioRefs = [];
          for(let i = 0; i < response.exerciciosFavoritos.length; i++){
                audioRefs.push({    
                     mp3: require(`../../assets/audios/${response.exerciciosFavoritos[i].exercicioFile}`),
                     isPlaying : false,
                     audioFile: response.exerciciosFavoritos[i].exercicioFile
                    });
                exercises[response.exerciciosFavoritos[i].exercicioFile] = response.exerciciosFavoritos[i].exercicioIsFavorite;
            }
          this.setState(
                {audioRefs: [...audioRefs],
                exercisesObj: exercises,
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
                
                  
                  let exercises = {};
                  let audioRefs = [];
                  for(let i = 0; i < response.exerciciosFavoritos.length; i++){
                        audioRefs.push({    
                             mp3: require(`../../assets/audios/${response.exerciciosFavoritos[i].exercicioFile}`),
                             isPlaying : false,
                             audioFile: response.exerciciosFavoritos[i].exercicioFile
                            } );
                        exercises[response.exerciciosFavoritos[i].exercicioFile] = response.exerciciosFavoritos[i].exercicioIsFavorite;
                    }
                    
                  this.setState(
                        {audioRefs: [...audioRefs],
                        objModule: objModule,
                        exercisesObj: exercises,
                        pageContent: response,
                        componentState: ComponentState.LOADED
                        }
                    );
                
                
                    
                }).catch((error) => {
                    this.setState( { componentState: ComponentState.ERROR});
                    console.log(error);
                });
            
           
        }
        if(prevState.exercisesObj != this.state.exercisesObj){
            let exerciseFiles = [];
            let exercisesToFavorite = [];
            for (const key in this.state.exercisesObj) {
                if (this.state.exercisesObj.hasOwnProperty(key)) {
                    exerciseFiles.push(key);
                    exercisesToFavorite.push(this.state.exercisesObj[key]);
                }
            }
        
            if(exerciseFiles.length == 0) return;

            repository.manageFavoriteExercises(exerciseFiles, exercisesToFavorite
            ).then((response) => {
                
            }
            ).catch((error) => {
                console.log(error);
            });
        }

        
        
    }


    setFavorite = (exerciseFile) => {
        let exercises = this.state.exercisesObj;
        exercises[exerciseFile] = !exercises[exerciseFile];
        this.setState({exercisesObj :
              {...exercises}});
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
                            <Grid container direction='column'>
                                <Grid item alignSelf={'center'}>
                                    <img alt='phones' src={
                                        this.state.module.theme === 'green'? phonesGreen 
                                        : this.state.module.theme === 'purple' ? phonesPurple 
                                        : phonesBlue}/>
                                </Grid>
                                <Grid item m={2} alignSelf={'center'} >
                                
                                <MuiAudioPlayer 
                                containerSx = {{textAlign:'center', backgroundColor: this.state.module.color1, borderRadius: 10, p:1}}
                                id="inline-timeline" display="timeline" inline paperize size='medium'
                                src={this.state.audioRefs.find(audioRef => audioRef.audioFile == data.exercicioFile).mp3} 
                                />

                                <IconButton sx={{pt:4, pb:0}} size='large' onClick={()=>{this.setFavorite(data.exercicioFile)}} >
                                
                                    {this.state.exercisesObj[data.exercicioFile] ? 
                                    <FavoriteIcon sx={{ fontSize: 60 }} htmlColor={this.state.module.color1} />
                                    :
                                    <FavoriteBorderIcon sx={{ fontSize: 60 }} htmlColor={this.state.module.color1 } /> }
                                </IconButton>
                                <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 18 }} variant='body1' color={"white"}>
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