import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';

import imgAborrecida from '../../../assets/images/aborrecida.png';
import imgAnsiosa from '../../../assets/images/ansiosa.png';
import imgCulpada from '../../../assets/images/culpada.png';
import imgEnvergonhada from '../../../assets/images/envergonhada.png';
import imgEntusiasmada from '../../../assets/images/entusiasmada.png';
import imgFeliz from '../../../assets/images/feliz.png';
import imgFrustrada from '../../../assets/images/frustrada.png';
import imgFuriosa from '../../../assets/images/furiosa.png';
import imgIrritada from '../../../assets/images/irritada.png';
import imgMotivada from '../../../assets/images/motivada.png';
import imgOrgulhosa from '../../../assets/images/orgulhosa.png';
import imgSozinha from '../../../assets/images/sozinha.png';
import imgTranquila from '../../../assets/images/tranquila.png';
import imgTriste from '../../../assets/images/triste.png';


function EpisodesEmotions() {

    const mockList = [
        {
            feeling: 'Feliz',
            quantity: 10
        },
        {
            feeling: 'Ansiosa',
            quantity: 4
        },
        {
            feeling: 'Aborrecida',
            quantity: 5
        },
        {
            feeling: 'Culpada',
            quantity: 7
        },
        {
            feeling: 'Sozinha',
            quantity: 4
        }
    ];

    const feelingsImg = 
        {
            'Feliz': imgFeliz,
            'Aborrecida': imgAborrecida,
            'Ansiosa': imgAnsiosa,
            'Culpada': imgCulpada,
            'Entusiasmada': imgEntusiasmada,
            'Envergonhada': imgEnvergonhada,
            'Frustrada': imgFrustrada,
            'Furiosa': imgFuriosa,
            'Irritada': imgIrritada,
            'Motivada': imgMotivada,
            'Orgulhosa': imgOrgulhosa,
            'Sozinha': imgSozinha,
            'Tranquila': imgTranquila,
            'Triste': imgTriste,
        }

  return (
        <>
            <Typography sx={{ fontWeight: 'bold', fontSize: 12, m: '0 auto', width:'70%', mt:'10px' }} variant="h6" align='center' color="primary">
                Sentimentos associados aos episódios de ingestão alimentar compulsiva
            </Typography>
            <ImageList
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr)) !important",
                    gridAutoColumns: "minmax(90px, 1fr)"
                }}
            >
                {mockList.map(function(data) {
                    return (
                        <ImageListItem key={data.feeling} sx={{ pl:1}} >
                            <img alt={data.feeling} src={feelingsImg[data.feeling]}/>
                            <ImageListItemBar sx={{ color: '#ed6fa6', textAlign:'center'}} position='below' title={data.quantity}/>
                        </ImageListItem>
                    )
                    })}
            </ImageList>
        </>
  );
}

export default EpisodesEmotions;
