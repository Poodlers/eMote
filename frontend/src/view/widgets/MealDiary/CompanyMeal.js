import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

import imgParceiroa from '../../../assets/images/parceiroa.png';
import imgPais from '../../../assets/images/pais.png';
import imgAmigos from '../../../assets/images/amigos.png';
import imgFilhos from '../../../assets/images/filhos.png';
import imgOutro from '../../../assets/images/outro.png';
import imgColegas from '../../../assets/images/colegas.png';
import imgSozinha from '../../../assets/images/sozinha_.png';


const imageList = [
        {
            company: 'Sozinha',
            image: imgSozinha
        },
        {
            company: 'Pais',
            image: imgPais
        },
        {
            company: 'Filhos',
            image: imgFilhos
        },
        {
            company: 'Amigos',
            image: imgAmigos
        },
        {
            company: 'Parceiro/a',
            image: imgParceiroa
        },        
        {
            company: 'Colegas',
            image: imgColegas
        },
        {
            company: 'Outro',
            image: imgOutro
        }
    ];


export default function CompanyMeal(props) {
  
  const companySelected = props.initialValue;
  const mainColor = props.mainColor;
  
  const setCompanySelected = props.setCompany;
  const canEdit = props.canEdit;

  const handleEmotionClick = (emotion) => {
    if (companySelected.includes(emotion)) {
        setCompanySelected(companySelected.filter((e) => e !== emotion));

    } else {
        setCompanySelected([...companySelected, emotion]);
    }
  }

  return (
    <div>
        <Box >
            <Grid container sx={{ p: 0.5, placeItems:"center" }} direction="row" >
                <Typography gutterBottom sx={{ pt:1, pl:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                Com quem partilhei a refeição?
                </Typography>
            </Grid>
        </Box>
        <Box display="flex" alignItems='center' justifyContent='center'>
          <Grid container textAlign={'center'}>
            {imageList.map(function(data, index) {
                return (
                    <Grid item xs={3} key= {data.company}>
                        <IconButton
                        color="info"
                        disabled={!canEdit}
                        sx ={{
                          ':disabled': { opacity: '50%',
                           backgroundColor: companySelected.includes(index) ? '#fff' : mainColor },
                          backgroundColor: companySelected.includes(index) ? '#fff' : mainColor  ,
                        '&:hover': {backgroundColor: companySelected.includes(index) ? '#fff' : mainColor },
                        p:0.5}}
                        onClick={() => canEdit ? handleEmotionClick(index): null}
                        >
                        <img alt='company' src={data.image}/>
                        </IconButton>
                    </Grid>
                )
            })}
            </Grid>
        </Box>
    </div>
  );
}