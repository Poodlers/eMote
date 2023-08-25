import * as React from 'react';
import { Grid, Box, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function SkipMeal() {
  return (
    <Box sx ={{p:1 }}>
        <Grid container sx={{ p: 0.5 }} direction="row" >
            <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                Quando comi
            </Typography>
            <TimePicker></TimePicker>
        </Grid>
    </Box>
  );
}