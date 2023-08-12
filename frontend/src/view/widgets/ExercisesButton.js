import * as React from 'react';
import { Box, Link, ImageListItem, ImageListItemBar, ImageList } from '@mui/material'
import Typography from '@mui/material/Typography';

import Mindfulness from '../../assets/images/mindfulness.png'
import Regulacao from '../../assets/images/regulacao.png'
import Tolerancia from '../../assets/images/tolerancia.png'

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
        <Link href="#" underline='none'>
            <Box sx ={{p:1, bgcolor: '#ec6fa7'}}>
                <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Quais os exercícios que mais me ajudaram hoje?
                </Typography>

                <ImageList
                    sx={{
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr)) !important",
                        backgroundSize: 'contain', backgroundRepeat: 'no-repeat'
                    }}
                    >                        
                    {modules.map(function(data, index) {
                        return (
                            <ImageListItem width = {10} key={index} sx={{ pl:1 }} >
                                <img alt={data.module} src={data.image} />
                                <ImageListItemBar sx={{ color: 'text.primary', textAlign:'center', fontSize: 2}} position='below' title={data.module}/>
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </Box>
        </Link>
        </Box>
    );
}