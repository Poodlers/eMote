import React from 'react';
import { Box, Button, IconButton, Rating, Slider, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { useNavigate, useParams } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { useEffect } from 'react';
import { useReward } from 'react-rewards';
import { ComponentState } from '../../models/ComponentState';

import DoneIcon from '@mui/icons-material/Done';

const marks = {
        1: 'Nada',
        2: 'Pouco',
        3: 'Mais ou menos',
        4: 'Muito',
        5: 'Extremamente',
    };

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${marks[value]}`;
    }

function FeedbackPage(props) {
    const repository = RepositorySingleton.getInstance().injectRepository();
    const navigate = useNavigate();


    let { moduleNumber } = useParams();
    const [hoverSatisfaction, setHoverSatisfaction] = React.useState(-1);
    const [hoverUsefulness, setHoverUsefulness] = React.useState(-1);
    const [componentState, setComponentState] = React.useState(ComponentState.LOADING);
    const [usefelnessScore, setUsefulnessScore] = React.useState(2);
    const [satisfactionScore, setSatisfactionScore] = React.useState(2);
    const [module, setModule] = React.useState({});

    const onSubmit = () => {
        const dataFim = new Date().toLocaleString().replace(',', '');
    
        while(isConfettiAnimating || isBalloonsAnimating) {
            console.log('animating');
        }
        repository.sendFeedback(moduleNumber, 
            usefelnessScore, satisfactionScore).then((response) => {
                repository.registerModuloTimeStamps(moduleNumber, undefined,dataFim).then((response) => {
                       
                    navigate('/home', { replace: true });
                }).catch((error) => {
                    console.log(error);
                });
            navigate('/home', { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    }

    const {reward: confettiReward, isAnimating: isConfettiAnimating}
     = useReward('confettiReward', 'confetti', {onAnimationComplete: () => onSubmit(), elementSize: 20, elementCount: 15 });
    const {reward: balloonsReward, isAnimating: isBalloonsAnimating} = useReward('balloonsReward', 'balloons',
     {elementSize: 50, elementCount: 15, startVelocity: 10});

    const triggerAnimations = () => {
        confettiReward();
        balloonsReward();
    }

    useEffect(() => {
        
        for (const obj of modulesThemes) {
        if (obj.moduloId == moduleNumber) {
            setModule(obj);
            break;
            }
        }
        repository.hasCompletedModulo(moduleNumber).then((response) => {
            repository.getFeedback(moduleNumber).then((response) => {
                setUsefulnessScore(response.utilidade);
                setSatisfactionScore(response.satisfacao);
                setComponentState(ComponentState.LOADED);
            }).catch((error) => {
                setComponentState(ComponentState.ERROR);
                console.log(error);
            });
            
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
           
            <Box sx={{ p:5 }}/>
               
                <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5,
                     pt:2.5, fontSize: 20, textAlign:'center' }} variant='body1'>
                    Considera que este Módulo foi útil para si?
                </Typography>
                <Box sx={{ display:"flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: '70%', m: '0 auto', textAlign:'center'}}>
                    <Rating
                        disabled={isConfettiAnimating || isBalloonsAnimating}
                        sx ={{ scale:'1.5'}}
                        name="hover-feedback"
                        value={usefelnessScore}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setUsefulnessScore(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHoverUsefulness(newHover);
                        }}
                        
                    />
                    {usefelnessScore !== null && (
                       <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5,
                        pt:2.5, fontSize: 17, textAlign:'center' }} variant='body2'>
                            <Box sx={{ ml: 2 }}>{marks[hoverUsefulness !== -1 ? hoverUsefulness : usefelnessScore]}</Box>
                        </Typography>
                    )}
                    </Box>
                </Box>
                <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20, textAlign:'center' }} variant='body1'>
                    Ficou satisfeita com este Módulo?
                </Typography>
                <Box sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', width:'100%'}}>
                    <Box sx={{ width: '70%', m: '0 auto', textAlign:'center'}}>
                    <Rating
                        disabled={isConfettiAnimating || isBalloonsAnimating}
                        sx ={{ scale:'1.5'}}
                        name="hover-feedback"
                        value={satisfactionScore}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setSatisfactionScore(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHoverSatisfaction(newHover);
                        }}
                        
                    />
                    {usefelnessScore !== null && (
                       <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5,
                        pt:2.5, fontSize: 17, textAlign:'center' }} variant='body2'>
                            <Box sx={{ ml: 2 }}>{marks[hoverSatisfaction !== -1 ? hoverSatisfaction : satisfactionScore]}</Box>
                        </Typography>
                    )}

                    <div id="confettiReward" style={{margin:'0 auto'}} />
                    <div id="balloonsReward" style={{margin:'0 auto'}} />
                    </Box>
                    
                </Box>
                
                    <Button onClick={triggerAnimations}
                    disabled={isConfettiAnimating || isBalloonsAnimating}
                    sx={{ bottom: "5%",
                        left: "70%",
                        position: "absolute", backgroundColor: module.color1, 
                    "&:hover": {backgroundColor: module.color3} }} variant="contained" endIcon={< DoneIcon/>}>
                        Concluir
                    </Button>
                </Box>
            </>
        }

        
        </>
  );
}

export default FeedbackPage;
