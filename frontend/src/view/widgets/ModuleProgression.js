import React from 'react';
import { LinearProgress, Typography, colors } from '@mui/material';



function ModuleProgression() {

    const mockList = [
        {
            index: 0,
            module: 'Psicoeducação',
            progression: 100
        },
        {
            index: 1,
            module: 'Mindfulness',
            progression: 50
        },
        {
            index: 2,
            module: 'Regulação Emocional',
            progression: 0
        },
        {
            index: 3,
            module: 'Tolerância a estados emocionais dolorosos',
            progression: 0
        }

    ];


    const colorModules = {
        0: [colors.deepOrange[100], colors.deepOrange[500]],
        1: [colors.indigo[100], colors.indigo[500]],
        2: [colors.deepPurple[100], colors.deepPurple[500]],
        3: [colors.cyan[100], colors.cyan[500]],
    }


  return (
        <>
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, p:1, }} variant="h6" color="text.primary">
                Progressão nos Módulos
            </Typography>
            {mockList.map(function(data) {
                return (
                    <>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 13, pt:1, pl:1 }} color={colorModules[data.index][1]} variant="h6" >{data.module}</Typography>
                    <LinearProgress sx={{
                        backgroundColor: colorModules[data.index][0],
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: colorModules[data.index][1],
                        }, height:12, width:'95%', m: '0 auto' }} variant="determinate" value={data.progression} />
                    </>
                )
            })}
        </>
  );
}

export default ModuleProgression;
