import React from 'react';
import { LinearProgress, Typography, colors } from '@mui/material';

function ModuleProgression() {

    const mockList = [
        {
            module: 'Psicoeducação',
            progression: 100
        },
        {
            module: 'Mindfulness',
            progression: 50
        },
        {
            module: 'Regulação Emocional',
            progression: 0
        },
        {
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
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, p:1, }} variant="h6" color="primary">
                Progressão nos Módulos
            </Typography>
            {mockList.map(function(data, index) {
                return (
                    <div key= {index}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 13, pt:1, pl:1 }} color={colorModules[index][1]} variant="h6" >{data.module}</Typography>
                    <LinearProgress sx={{
                        backgroundColor: colorModules[index][0],
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: colorModules[index][1],
                        }, height:12, width:'95%', m: '0 auto' }} variant="determinate" value={data.progression} />
                    </div>
                )
            })}
        </>
  );
}

export default ModuleProgression;
