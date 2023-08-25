import * as React from 'react';
import { Box, Link, ImageListItem, ImageListItemBar, ImageList } from '@mui/material'
import Typography from '@mui/material/Typography';

import Mindfulness from '../../../assets/images/mindfulness.png'
import Regulacao from '../../../assets/images/regulacao.png'
import Tolerancia from '../../../assets/images/tolerancia.png'

const modules = [
    {
        module: 'Mindfulness',
        image: Mindfulness
    },
    {
        module: 'Regulação Emocional',
        image: Regulacao
    },
    {
        module: 'Tolerânica a estados emocionais dolorosos',
        image: Tolerancia
    },
]

export default function ExercisesButton(props) {
  return (
    <Box sx ={{p:1 }}>
        <Link href="exercises" underline='none'>
            <Box sx ={{p:1, bgcolor: '#ec6fa7'}}>
                <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Quais os exercícios que mais me ajudaram hoje?
                </Typography>

                <ImageList
                    sx={{
                        justifyContent: 'center',
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(3,minmax(50px,160px)) !important",
                    }}
                    >                        
                    {modules.map(function(data, index) {
                        return (
                            <ImageListItem key={index} sx={{ pl:1 }} >
                                <img style={{objectFit:'contain'}} alt={data.module} src={data.image} />
                                <ImageListItemBar sx={{ 
                                    color: 'text.primary', 
                                    textAlign:'center',
                                    "& .MuiImageListItemBar-subtitle": { whiteSpace: 'pre-line', overflow: 'visible' }
                                    }} position='below' subtitle={data.module}/>
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </Box>
        </Link>
        </Box>
    );
}