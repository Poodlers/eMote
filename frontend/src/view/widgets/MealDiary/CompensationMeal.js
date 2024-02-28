import * as React from 'react';
import { Grid, Box, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography';
import { CompensatoryBehavior } from '../../../models/CompensatoryBehavior';
import { useEffect } from 'react';


export default function CompensationMeal(props) {

    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(!checked);
        props.setHadBehaviour(!checked)
    };

    const [behav1, setBehav1] = React.useState(false);

    const [behav2, setBehav2] = React.useState(false);

    const [behav3, setBehav3] = React.useState(false);

    const [behav4, setBehav4] = React.useState(false);

    const [behav5, setBehav5] = React.useState(false);

    const [behav6, setBehav6] = React.useState(false);

    const getCompensatoryList = () => {
        return compensationBehaviors.map(function(data, index) {
             if(data.controller){
                return data.enumValue;
             }
                return null;

            }).filter(function (el) {
                return el != null;
              });
       
    }

    const compensationBehaviors = [
        {
            behavior: 'Vomitar',
            controller: behav1,
            enumValue: CompensatoryBehavior.Vomitar,
            onChange: (bool) => {
                setBehav1(bool);
              
            }
                
        },
        {
            behavior: 'Fazer exercício físico excessivo',
            enumValue : CompensatoryBehavior.AtividadeFisicaExcessiva,
            controller: behav2,
            onChange: (bool) => {
                setBehav2(bool);
                
            }
        },
        {
            behavior: 'Restrição alimentar excessiva',
            enumValue : CompensatoryBehavior.RestricaoAlimentarExcessiva,
            controller: behav3,
            onChange: (bool) => {
                setBehav3(bool);
                
            }
        },
        {
            behavior: 'Tomar laxantes e/ou diuréticos',
            enumValue : CompensatoryBehavior.TomarLaxantes,
            controller: behav4,
            onChange: (bool) => {
                setBehav4(bool);
                
            }
        },
        {
            behavior: 'Tomar medicação para emagrecer',
            enumValue : CompensatoryBehavior.TomarMedicacaoParaEmagrecer,
            controller: behav5,
            onChange: (bool) => {
                setBehav5(bool);
             
            }
        },
        {
            behavior: 'Outro',
            enumValue : CompensatoryBehavior.Outro,
            controller: behav6,
            onChange: (bool) => {
                setBehav6(bool);
                
            }
        },
    ]

    useEffect(() => {
        
        if(props.initialValue.length > 0){
            
            setChecked(true);
            compensationBehaviors.forEach((data) => {
                if(props.initialValue.includes(data.enumValue)){
                    data.onChange(true);
                }
            })
        }
    }, []);

    useEffect(() => {
        props.setBehaviours(getCompensatoryList());
    }, [behav1, behav2, behav3, behav4, behav5, behav6]);

  return (
    
    <Box sx ={{p: 0.5 }}>
        <Grid container spacing={2} sx={{ p: 0.5 }} direction="row" >
            <Grid item xs={10}>
                <Typography gutterBottom sx={{ pt:1, fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Recorri a algum comportamento compensatório?
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Checkbox id='compensation' color='info'
                disabled={props.readOnly}
                checked={checked}
                onChange={handleChange}></Checkbox>
            </Grid>
        </Grid>
        {checked?
            <Box sx={{ p: 2.5 }}>
                {compensationBehaviors.map(function(data, index) {
                    return (
                    <Grid key={index} container spacing={2} direction="row" >
                        <Grid item xs={10}>
                            <Typography gutterBottom sx={{ fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                                {data.behavior}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Checkbox
                            disabled={props.readOnly}
                            id={data.behavior}
                            checked={data.controller}
                            
                            onChange={() => {data.onChange(!data.controller);}}
                            color='info'></Checkbox>
                        </Grid>
                    </Grid>
                    )
                })}
            </Box> : <></> }
    </Box>
  );
}