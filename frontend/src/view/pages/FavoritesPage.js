import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { ComponentState } from '../../models/ComponentState';
import Titulo from '../../assets/images/titulo_favoritos.png';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { Link } from 'react-router-dom';


function FavoritesPage() {

    const repository = RepositorySingleton.getInstance().injectRepository();
    const [exercisesList, setExerciseList] = useState([]);
    const [componentState, setComponentState] = useState(ComponentState.LOADING);

    const fetchInfo = () => {
        return repository.fetchFavoriteExercises().then((response) => {
            setExerciseList(response);
            setComponentState(ComponentState.LOADED);
        }).catch((error) => {
            setComponentState(ComponentState.ERROR);
        });
      }
    
    useEffect(() => {
        fetchInfo();
        // eslint-disable-next-line
      }, []);
    
    return (
        <>
        <LogoAppBar/>
        <Box sx={{mt:'60px', mb:'70px'}}>
            <Grid container sx={{ pt:5, pb:4 }} direction="row" justifyContent="center">
                <img alt='title' src={Titulo} height={32}/>
            </Grid>
            
            {
            componentState === ComponentState.LOADING ?
                <Typography color="primary" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                    Carregando exercícios favoritos...
                </Typography>
                :
            componentState === ComponentState.ERROR ?
                <Typography color="error" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                    Erro ao carregar exercícios favoritos
                </Typography>
                :
                exercisesList.length !== 0 ?
                    exercisesList.map(function(data, index) {
                        return (
                            <div key= {index}>
                                <Link 
                                    to={`/submodulepage/${data.moduloNumberOrder}/${data.subModuleNumberOrder}/${data.pageNumber}`}
                                    underline="none"
                                    style={{ textDecoration: 'none' }}
                                >
                                <Typography color="primary" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                                    {data.exercicioName}
                                </Typography>
                                </Link>
                            </div>
                        )
                    })
                :
                <Typography color="primary" sx = {{fontWeight: "bold", p:0.5, ml: '10px'}} >
                    Você ainda não possui exercícios favoritos
                </Typography>
            }


        </Box>
        <NavBar/>
        </>
  );
}

export default FavoritesPage;
