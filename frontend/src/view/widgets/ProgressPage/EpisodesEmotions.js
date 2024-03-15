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
import imgOutro from '../../../assets/images/outro_.png';

function EpisodesEmotions(props) {
    
    const feelingsImg = 
        {
            'Ansiosa' : imgAnsiosa,
            'Aborrecida': imgAborrecida,
            'Culpada': imgCulpada,
            'Entusiasmada': imgEntusiasmada,
            'Envergonhada': imgEnvergonhada,
            'Feliz': imgFeliz,
            'Frustrada': imgFrustrada,
            'Furiosa': imgFuriosa,
            'Irritada': imgIrritada,
            'Motivada': imgMotivada,
            'Orgulhosa': imgOrgulhosa,
            'Sozinha': imgSozinha,
            'Tranquila': imgTranquila,
            'Triste': imgTriste

        }

    const emotionsData = props.emotionsData;

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
                {emotionsData.map(function(data,index) {
                    return (
                        <ImageListItem key={index} sx={{ pl:1}} >
                            <img alt={data.sentimento} src={feelingsImg[data.sentimento] ?? imgOutro }/>
                            {feelingsImg[data.sentimento] == undefined ? 
                            <ImageListItemBar sx={{ color: '#ed6fa6', textAlign:'center'}} position='below' title={data.sentimento}/> 
                            : <ImageListItemBar sx={{ color: '#ed6fa6', textAlign:'center'}} position='below' title={''}/> 
                            }
                            <ImageListItemBar sx={{ color: '#ed6fa6', textAlign:'center'}} position='below' title={data.count}/>
                        </ImageListItem>
                    )
                    })}
            </ImageList>
        </>
  );
}

export default EpisodesEmotions;
