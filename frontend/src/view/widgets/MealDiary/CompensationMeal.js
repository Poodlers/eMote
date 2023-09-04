import * as React from 'react';
import { Grid, Box, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function CompensationMeal() {

    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.value);
      };

    const [behav1, setBehav1] = React.useState(false);
    const handleChange1 = (event) => {
        setBehav1(event.target.value);
      };
    const [behav2, setBehav2] = React.useState(false);
    const handleChange2 = (event) => {
        setBehav2(event.target.value);
      };
    const [behav3, setBehav3] = React.useState(false);
    const handleChange3 = (event) => {
        setBehav3(event.target.value);
      };
    const [behav4, setBehav4] = React.useState(false);
    const handleChange4 = (event) => {
        setBehav4(event.target.value);
      };
    const [behav5, setBehav5] = React.useState(false);
    const handleChange5 = (event) => {
        setBehav5(event.target.value);
      };
    const [behav6, setBehav6] = React.useState(false);
    const handleChange6 = (event) => {
        setBehav6(event.target.value);
      };

    const compensationBehaviors = [
        {
            behavior: 'Vomitar',
            controller: behav1,
            function: handleChange1
        },
        {
            behavior: 'Fazer exercício físico excessivo',
            controller: behav2,
            function: handleChange2
        },
        {
            behavior: 'Restrição alimentar excessiva',
            controller: behav3,
            function: handleChange3
        },
        {
            behavior: 'Tomar laxantes e/ou diuréticos',
            controller: behav4,
            function: handleChange4
        },
        {
            behavior: 'Tomar medicação para emagrecer',
            controller: behav5,
            function: handleChange5
        },
        {
            behavior: 'Outro',
            controller: behav6,
            function: handleChange6
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
                <Checkbox color='info'
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
                            checked={data.controller}
                            onChange={data.function}
                            color='info'></Checkbox>
                        </Grid>
                    </Grid>
                    )
                })}
            </Box> : <></> }
    </Box>
  );
}