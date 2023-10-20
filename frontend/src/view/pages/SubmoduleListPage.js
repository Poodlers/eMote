import React, { useEffect } from 'react';
import { AppBar, Box, Button, Grid, IconButton, Link, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar';
import { NavBar } from '../widgets/NavBar';

import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import { modulesThemes } from '../../constants/themes.js'
import { useNavigate, useParams } from 'react-router-dom';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { ComponentState } from '../../models/ComponentState';

function SubmoduleListPage() {
    let { moduleNumber } = useParams();
    const navigate = useNavigate();
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const [submodules, setSubmodules] = React.useState([]);
    const [module, setModule] = React.useState({});
   
   
    const repository = RepositorySingleton.getInstance().injectRepository();
            
    useEffect(() => {
        repository.getSubmoduleList(moduleNumber).then((response) => {
            console.log(response);

            for (const obj of modulesThemes) {
                if (obj.moduloId == moduleNumber) {
                    setModule(obj);
                    break;
                }
            }
            setSubmodules(response);
            setComponentState(ComponentState.LOADED);
        
        }).catch((error) => {
            console.log(error);
            setComponentState(ComponentState.ERROR);
        }
        );
    }, []);
    
    const onSubModuleClick = (isBlocked, index) => {
        if(isBlocked){
            return;
        }
        const dataInicio = new Date().toLocaleString().replace(',', '');
        console.log(dataInicio);
        repository.registerSubModuloTimeStamps(moduleNumber, index, dataInicio,
            undefined
            ).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });   

        navigate(`/submodulepage/${moduleNumber}/${index}/1`);
    }

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
            <LogoAppBar color={module.theme}/>

            <Box sx={{mt:'60px', backgroundColor: module.color2, height: '100vh'}}>
                
                <AppBar sx ={{boxShadow: 'none', top: '60px', backgroundColor: module.color1, height:'100px' }} >
                    <Box sx ={{ alignContent: 'center', m: 'auto',}}>
                        <Typography align= 'center' sx={{ fontSize: 30, fontWeight: 500 }} variant='body1' color={"white"}>
                            {module.name}
                        </Typography>
                    </Box>
                </AppBar>

                <Box sx= {{position:'relative', top:'100px', pb:7.5,}} textAlign='center'>
                {submodules.map((obj, index) => (
                    <Box key={index} sx ={{p:2, height: '85px', bgcolor: index%2===0? module.color3 : module.color4}} textAlign='center'>
                        <Button onClick={() => onSubModuleClick(obj.isBlocked, index + 1)} 
                            sx ={{ width:'100%'}} >
                            <Grid direction='row' container>
                                <Grid item xs={1}>
                                    {obj.isBlocked ? <Lock htmlColor={
                                        module.theme === 'blue' || module.theme === 'green' ?
                                        index%2===0 ?
                                        module.color1 :
                                        "white" :
                                        "white"}
                                        /> : <LockOpen htmlColor={
                                            module.theme === 'blue' || module.theme === 'green' ?
                                            index%2===0 ?
                                            module.color1 :
                                            "white" :
                                            "white"}/>}
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography sx={{ fontSize: 18, textAlign:'start', textTransform:'none', pl: 0.5, fontWeight:500}} variant='body1' color={
                                        module.theme === 'blue' || module.theme === 'green' ?
                                        index%2===0 ?
                                        module.color1 :
                                        "white" :
                                        "white"}>
                                        {obj.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Box>
                ))}
                </Box>
            </Box>
   
            <NavBar color={module.theme}/>
            </>
    }
    
    </>

  );
}

export default SubmoduleListPage;
