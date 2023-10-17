import React from 'react';
import { Box, Button, Checkbox, Grid, Slider, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { NavBar } from '../widgets/NavBar.js';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { useEffect } from 'react';

import { ComponentState } from '../../models/ComponentState';
import { useNavigate } from 'react-router-dom';


function NotificationsPage() {
    const navigate = useNavigate();
    const repository = RepositorySingleton.getInstance().injectRepository();

    const onConfirm = () => {
        repository.changeRateOfNotifsPerDay(amountOfNotifs).then(() => {
            console.log("Rate of notifs changed");
            navigate('/profile', { replace: true })
        }
        ).catch((error) => {
            console.log("Error changing rate of notifs: " + error);
        });

    }

    const [checked, setChecked] = React.useState(false);
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const [amountOfNotifs, setAmountOfNotifs] = React.useState(3);
    const handleChange = () => {
        if(!checked) setAmountOfNotifs(0);
        else setAmountOfNotifs(3);
        setChecked(!checked);

        
    };

    useEffect(() => {
        if(Notification.permission === 'granted'){
            repository.getRateOfNotifsPerDay().then((response) => {
                setAmountOfNotifs(response);

                if(response === 0) setChecked(true);
                setComponentState(ComponentState.LOADED);
            }).catch((error) => {
                console.log(error);
                setComponentState(ComponentState.ERROR);
            });
        }else{
            setAmountOfNotifs(0);
            setChecked(true);
            setComponentState(ComponentState.LOADED);
        }
    }
    , []);

    return (
        
        <>

        <LogoAppBar/>

            {
                componentState === ComponentState.ERROR ?
                    <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
                        Erro ao carregar os dados
                    </Typography>
                    : 
                    componentState === ComponentState.LOADING ?
                    <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
                        Carregando...
                    </Typography>
                    : <Box sx={{mt:'60px', mb:'70px'}}>
            
            <Typography sx={{ fontWeight: 'bold', fontSize: 28, p:2.5, mt:'70px' }} variant="h4" align='center' color="text.secondary">
              Editar Lembretes
            </Typography>
            <Box sx ={{p: 0.5 }}>
                    <Grid container spacing={2} sx={{ p: 0.5 }} direction="row" >
                        <Grid item xs={10}>
                            <Typography gutterBottom sx={{ pt:1, pl:3, fontSize: 18, fontWeight: 500 }} variant='body1' color={'primary'}>
                                Não desejo receber lembretes
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Checkbox id='receiveNotifs'
                            checked={checked}
                            onChange={handleChange}></Checkbox>
                        </Grid>
                    </Grid>
                {!checked?
                    <>
                    <Typography color='primary' sx={{p:1, pl:2.5,
                        pt:2.5, fontSize: 20, textAlign:'center' }} variant='body1'>
                        Quantas vezes ao dia deseja receber lembretes?
                    </Typography>

                    <Box sx={{ display:"flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: '70%', m: '0 auto', textAlign:'center'}}>
                    <Slider
                            aria-label="Custom marks"
                            value={amountOfNotifs}
                            onChange={(e) => setAmountOfNotifs(e.target.value)}
                            step={1}
                            valueLabelDisplay="auto"
                            marks
                            min={1}
                            max={6}
                            color="primary"
                        />
                       <Typography sx={{p:1, pl:2.5,
                        pt:2.5, fontSize: 17, textAlign:'center' }} variant='body2'>
                            <Box sx={{ ml: 2 }}></Box>
                        </Typography>
                    </Box>
                    </Box>
                    </> : null}

                </Box>
                <Box sx ={{ p:3 }} textAlign='center'>
                    <Button sx ={{ p:1, bgcolor: '#349db7' }} onClick={onConfirm}>
                        <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                            Confirmar
                        </Typography>
                    </Button>
                </Box>
        </Box>
    }
        <NavBar/>
        </>
  );
}

export default NotificationsPage;