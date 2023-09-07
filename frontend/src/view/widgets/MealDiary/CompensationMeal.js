import * as React from 'react';
import { Grid, Box, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function CompensationMeal() {

    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(!checked);
      };

    const [behav1, setBehav1] = React.useState(false);

    const [behav2, setBehav2] = React.useState(false);

    const [behav3, setBehav3] = React.useState(false);

    const [behav4, setBehav4] = React.useState(false);

    const [behav5, setBehav5] = React.useState(false);

    const [behav6, setBehav6] = React.useState(false);

    const compensationBehaviors = [
        {
            behavior: 'Vomitar',
            controller: behav1,
            function: setBehav1
        },
        {
            behavior: 'Fazer exercício físico excessivo',
            controller: behav2,
            function: setBehav2
        },
        {
            behavior: 'Restrição alimentar excessiva',
            controller: behav3,
            function: setBehav3
        },
        {
            behavior: 'Tomar laxantes e/ou diuréticos',
            controller: behav4,
            function: setBehav4
        },
        {
            behavior: 'Tomar medicação para emagrecer',
            controller: behav5,
            function: setBehav5
        },
        {
            behavior: 'Outro',
            controller: behav6,
            function: setBehav6
        },
    ]

  return (
    <Box sx ={{p: 0.5 }}>
        <Grid container spacing={2} sx={{ p: 0.5 }} direction="row" >
            <Grid item xs={10}>
                <Typography gutterBottom sx={{ pt:1, fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Recorri a algum comportamento compensatório inapropriado
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Checkbox id='compensation' color='info'
                checked={checked}
                onChange={handleChange}></Checkbox>
            </Grid>
        </Grid>
        {checked?
            <Box sx={{ p: 2.5 }}>
                {compensationBehaviors.map(function(data, index) {
                    return (
                    <Grid container spacing={2} direction="row" >
                        <Grid item xs={10}>
                            <Typography gutterBottom sx={{ fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                                {data.behavior}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Checkbox
                            id={data.behavior}
                            checked={data.controller}
                            onChange={() => {data.function(!data.controller); console.log(data.controller)}}
                            color='info'></Checkbox>
                        </Grid>
                    </Grid>
                    )
                })}
            </Box> : <></> }
    </Box>
  );
}