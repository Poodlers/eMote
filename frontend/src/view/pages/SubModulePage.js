import React from 'react';
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar';

import { modulesThemes } from '../../constants/themes.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import phonesPurple from '../../assets/images/phones_rosa.png';
import phonesGreen from '../../assets/images/phones.png';

import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ComponentState } from '../../models/ComponentState';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { NavBar } from '../widgets/NavBar';
import SubmoduleContentPage from './SubmoduleContentPage';



function SubModulePage(props) {
    const navigate = useNavigate();
    let { moduleNumber, submoduleNumber, pageNumber } = useParams();
    const repository = RepositorySingleton.getInstance().injectRepository();
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const [module, setModule] = React.useState({});
    const [pageContent, setPageContent] = React.useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [exercisesObj, setExercisesObj] = useState({});

    useEffect(() => {
        let exerciseFiles = [];
        let exercisesToFavorite = [];
        for (const key in exercisesObj) {
            if (exercisesObj.hasOwnProperty(key)) {
                exerciseFiles.push(key);
                exercisesToFavorite.push(exercisesObj[key]);
            }
          }
       
        if(exerciseFiles.length == 0) return;

        repository.manageFavoriteExercises(exerciseFiles, exercisesToFavorite
        ).then((response) => {
            
        }
        ).catch((error) => {
            console.log(error);
        });
    },
        [exercisesObj])

    
    useEffect(() => {
        if(isPlaying){
            //audioElem.current.play();
            console.log('playing');
        }
        else{
            //audioElem.current.pause();
            console.log('paused');
        }
    },
        [isPlaying])

    useEffect(() => {
        repository.getPageContent(moduleNumber, submoduleNumber,pageNumber).then((response) => {
            if(response.isBlocked){
                setComponentState(ComponentState.NOT_ALLOWED);
                return;
            }
          for (const obj of modulesThemes) {
            if (obj.moduloId == moduleNumber) {
              setModule(obj);
              break;
            }
          }
          setPageContent(response);
          let exercises = {};
          for(let i = 0; i < response.exerciciosFavoritos.length; i++){
                exercises[response.exerciciosFavoritos[i].exercicioFile] = response.exerciciosFavoritos[i].exercicioIsFavorite;
            }

          setExercisesObj(exercises);
          
          setComponentState(ComponentState.LOADED);
            
        }).catch((error) => {
            setComponentState(ComponentState.ERROR);
            console.log(error);
        });
    }, [pageNumber, submoduleNumber, moduleNumber]);

    const setFavorite = (exerciseFile) => {
        let exercises = exercisesObj;
        
        exercises[exerciseFile] = !exercises[exerciseFile];
    
        setExercisesObj({...exercises});
    }

    const handleEndOfPage = () => {
        const nextPageLink =
        pageContent.isLastPageInModulo ?
        module.feedbacklink :
        pageContent.isLastPage ? 
        `/submodulelist/${moduleNumber}` :
        `/submodulepage/${moduleNumber}/${submoduleNumber}/${parseInt(pageNumber) + 1}`;
        
        const dataFim = new Date().toLocaleString().replace(',', '');
        console.log(dataFim);
        if(pageContent.isLastPage){
            repository.registerSubModuloTimeStamps(moduleNumber, submoduleNumber, undefined,
            dataFim
            ).then((response) => {
                console.log('Submodule end!: ' + response);
                if(pageContent.isLastPageInModulo){
                    repository.registerModuloTimeStamps(moduleNumber, undefined,dataFim).then((response) => {
                        console.log(response);
                        navigate(nextPageLink, { replace: true });
                    }).catch((error) => {
                        console.log(error);
                    });
                }else{
                    navigate(nextPageLink, { replace: true });
                }
            }).catch((error) => {
                console.log(error);
            });

            
        }else{
            
            navigate(nextPageLink, { replace: true });
        }   

    }

  return (
    <>
    {
        componentState == ComponentState.NOT_ALLOWED ?
        <Typography color="secondary" sx={{ fontWeight: "bold", p: 0.5, ml: '10px' }} >
            Página bloqueada até completar o submodulo anterior
        </Typography>
        :
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
    {<audio src=''/>}
    <LogoAppBar color={module.theme} goBack={true}/>
    <AppBar sx ={{boxShadow: 'none', top: '60px', backgroundColor: module.color1 }} >
        <Box sx ={{p:5, pt:2, pb:2, alignContent: 'center', width: '80%', m:'0 auto'}}>
            <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 20, fontWeight: 500 }} variant='body1' color={"white"}>
                {pageContent.subModuleTitle}
            </Typography>
        </Box>
    </AppBar>

    <Box sx={{mt:'120px', mb:'70px'}}>

      <Box sx= {{pt:1}} textAlign='center'>
        <SubmoduleContentPage 
        isLastPage={pageContent.isLastPage}
        module={module} pageNumber={pageNumber} subModuleNumber={submoduleNumber} submodulesContent={pageContent.subModulePage}/>
        {pageContent.subModulePage.exercicios.map(function(data, index){
            return (
            <div key={index}>
                <Box sx= {{pt:3}}> 
                    <Typography align= 'center' sx={{ alignSelf:'center', fontSize: 22, fontWeight: 500 }} variant='body1' color={"white"}>
                        {data.exercicioName}
                    </Typography>
                </Box>
                <Box sx= {{p:3}}>
                    <Grid container direction='row'>
                        <Grid item xs={9}>
                            <img alt='phones' src={module.name == 'Regulação emocional'? phonesPurple : phonesGreen}/>
                        </Grid>
                        <Grid item alignSelf='end' xs={3}>
                            <IconButton size='large' onClick={()=>{setIsPlaying(!isPlaying)}} >
                                {isPlaying ? 
                                <PauseCircleFilledIcon sx={{ fontSize: 60 }} htmlColor={module.color1} />
                                : 
                                <PlayCircleFilledIcon sx={{ fontSize: 60 }} htmlColor={module.color1} /> }
                            </IconButton>
                        </Grid>
                    </Grid>

                    <IconButton sx={{p:3}} size='large' onClick={()=>{setFavorite(data.exercicioFile)}} >
                        
                        {exercisesObj[data.exercicioFile] ? 
                        <FavoriteIcon sx={{ fontSize: 60 }} htmlColor={module.color1} />
                        :
                        <FavoriteBorderIcon sx={{ fontSize: 60 }} htmlColor={module.color1 } /> }
                    </IconButton>
                </Box>
            </div>
            )
        })}


      </Box>
      
        <IconButton onClick={handleEndOfPage} sx={{ bottom:"5%", left:"70%" }}>
            <img alt='check' src={module.check}/>
        </IconButton>
    </Box>
    <NavBar color={module.theme}/>
   
    </>
            
        
    }
    </>
    

  );
}

export default SubModulePage;
