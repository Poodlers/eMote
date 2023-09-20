import React from 'react';
import { Box, Button, IconButton, Slider, Typography } from '@mui/material';
import { LogoAppBar } from '../widgets/LogoAppBar.js';
import { Link } from 'react-router-dom';
import { modulesThemes } from '../../constants/themes.js';

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
    var module = null;

    for (const obj of modulesThemes) {
        if (obj.name === props.name) {
            module = obj;
        }
    }
    return (
        document.body.style = 'background:' + module.color2,
        <>
        <LogoAppBar color={module.theme} />

        <Box sx={{mt:'60px', mb:'70px'}}>
            <Typography align= 'center' sx={{ pt:5, alignSelf:'center', fontSize: 50, fontWeight: 500 }} variant='body1' color={module.theme == 'blue'? module.color1: 'white'}>
                Parabéns!
            </Typography>

            <Box sx={{ p:10 }}/>
                <Typography color={module.theme === "blue" ? module.color1 : "white" } sx={{p:1, pl:2.5, pt:2.5, fontSize: 20, textAlign:'center' }} variant='body1'>
                    Considera que este Módulo foi útil para si?
                </Typography>
                <Box sx={{ display:"flex", alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: '70%',}}>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={2}
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
                            defaultValue={2}
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


            <IconButton component={Link} to='/home' 
                sx={{ bottom: "5%",
                    left: "70%",
                    position: "absolute" }}
            >
                <img alt='check' src={module.check}/>

            </IconButton>
        </Box>
        </>
  );
}

export default FeedbackPage;
