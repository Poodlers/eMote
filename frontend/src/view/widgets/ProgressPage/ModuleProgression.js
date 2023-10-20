import React from 'react';
import { LinearProgress, Typography, colors } from '@mui/material';

function ModuleProgression(props) {

    const progressInfo = props.progressInfo;
    const moduleNames = ['Psicoeducação', 'Mindfulness', 'Regulação Emocional', 'Tolerância a estados emocionais dolorosos'];
    


    const colorModules = {
        0: ['#E9C9BC', '#F18700'],
        1: ['#D3E6DA', '#346F6F'],
        2: ['#CFC5CB', '#7A5C6C'],
        3: ['#D6E1E5', '#53B8C4'],
    }


  return (
        <>
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, p:1, }} variant="h6" color="primary">
                Progressão nos Módulos
            </Typography>
            {progressInfo.map(function(data, index) {
                return (
                    <div key= {index}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 13, pt:1, pl:1 }} 
                    color={colorModules[index][1]} variant="h6" >
                        { moduleNames[data.moduloNumberOrder - 1] }
                        </Typography>
                    <LinearProgress sx={{
                        backgroundColor: colorModules[index][0],
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: colorModules[index][1],
                        }, height:12, width:'95%', m: '0 auto' }} variant="determinate" value={data.userProgress} />
                    </div>
                )
            })}
        </>
  );
}

export default ModuleProgression;
