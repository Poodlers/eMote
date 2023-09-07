import * as React from 'react';
import { Grid, Box, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function CompulsiveEpisodeMeal() {
  return (
    <Box sx ={{p: 0.5 }}>
        <Grid container spacing={2} sx={{ p: 0.5 }} direction="row" >
            <Grid item xs={10}>
                <Typography gutterBottom sx={{ pt:1, fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Tive um episódio de ingestão alimentar compulsiva
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Checkbox id='compulsive' color='info'></Checkbox>
            </Grid>
        </Grid>
    </Box>
  );
}