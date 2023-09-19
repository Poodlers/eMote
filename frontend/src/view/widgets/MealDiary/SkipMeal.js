import * as React from 'react';
import { Grid, Box, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function SkipMeal(props) {
  return (
    <Box sx ={{ p: 0.5 }}>
        <Grid container spacing={2} sx={{ p: 0.5 }} direction="row" >
            <Grid item xs={10}>
                <Typography gutterBottom sx={{ pt:1, fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                  Saltei esta refeição
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Checkbox id='skip' 
                checked={props.initialValue}
                disabled={props.readOnly}
                color='info' onChange={
                    (event) => {
                        props.setSkippedMeal(event.target.checked);
                    }
                }></Checkbox>
            </Grid>
        </Grid>
    </Box>
  );
}