import React from 'react';
import { Box, Button, IconButton, Slider, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { useNavigate, useParams } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { useEffect } from 'react';
import { ComponentState } from '../../models/ComponentState';

const marks = [
    {
      value: 0,
      label: 'Nada',
    },
    {
      value: 1,
      label: 'Pouco',
    },
    {
      value: 2,
      label: 'Mais ou menos',
    },
    {
      value: 3,
      label: 'Muito',
    },
    {
      value: 4,
      label: 'Extremamente',
    },
];

function valuetext(value) {
    for (let mark of marks){
        if (mark.value==value)
            return mark.label
    }
    return null;
  }

function FeedbackPage(props) {
    const repository = RepositorySingleton.getInstance().injectRepository();
    const navigate = useNavigate();
    let { moduleNumber } = useParams();
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const [usefelnessScore, setUsefulnessScore] = React.useState(0);
    const [satisfactionScore, setSatisfactionScore] = React.useState(0);
    const [module, setModule] = React.useState({});

    const onSubmit = () => {
        
        repository.sendFeedback(moduleNumber, 
            usefelnessScore, satisfactionScore).then((response) => {
            navigate('/home', { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        
        for (const obj of modulesThemes) {
        if (obj.moduloId == moduleNumber) {
            setModule(obj);
            break;
            }
        }
        repository.hasCompletedModulo(moduleNumber).then((response) => {
            setComponentState(ComponentState.LOADED);
            console.log(response);
        }).catch((error) => {
            console.log(error);
            setComponentState(ComponentState.ERROR);
        });

        }
    
    , []);


    
    return (
        
        <>
        {
            componentState == ComponentState.LOADING ?
            <Typography align= 'center' sx={{ pt:5, alignSelf:'center', fontSize: 50, fontWeight: 500 }} variant='body1' color={module.theme == 'blue'? module.color1: 'white'}>
                A carregar...
            </Typography>
            :
            componentState == ComponentState.ERROR ?
            <Typography align= 'center' sx={{ pt:5, alignSelf:'center', fontSize: 50, fontWeight: 500 }} variant='body1' color={module.theme == 'blue'? module.color1: 'white'}>
                Erro ao carregar página
            </Typography>
            :
            <>
                <LogoAppBar color={module.theme} />

            <Box sx={{pt: '60px', height: '93vh'}} bgcolor={module.color2}>
            <Typography align= 'center' sx={{ pt:5, alignSelf:'center', fontSize: 50, fontWeight: 500 }} variant='body1' color={module.theme == 'blue'? module.color1: 'white'}>
                Parabéns!
            </Typography>

            <Box sx={{ p:10 }}/>
                <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5,
                     pt:2.5, fontSize: 20, textAlign:'center' }} variant='body1'>
                    Considera que este Módulo foi útil para si?
                </Typography>
                <Box sx={{ display:"flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: '70%',}}>
                        <Slider
                            aria-label="Custom marks"
                            value = {usefelnessScore}
                            onChange={(event, newValue) => {
                                setUsefulnessScore(newValue);

                            }
                            }
                            step={1}
                            valueLabelFormat={valuetext}
                            valueLabelDisplay="auto"
                            marks
                            min={0}
                            max={4}
                            color="info"
                        />
                    </Box>
                </Box>
                <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20, textAlign:'center' }} variant='body1'>
                    Ficou satisfeita com este Módulo?
                </Typography>
                <Box sx={{ display:"flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: '70%',}}>
                        <Slider
                            aria-label="Custom marks"
                            value={satisfactionScore}
                            onChange={(event, newValue) => {
                                setSatisfactionScore(newValue);

                            }
                            }
                            step={1}
                            valueLabelFormat={valuetext}
                            valueLabelDisplay="auto"
                            marks
                            min={0}
                            max={4}
                            color="info"
                        />
                    </Box>
                </Box>
                <IconButton onClick={onSubmit}
                    sx={{ bottom: "5%",
                        left: "70%",
                        position: "absolute" }} >
                    <img alt='check' src={module.check}/>

                </IconButton>
                </Box>
            </>
        }

        
        </>
  );
}

export default FeedbackPage;
