import * as React from 'react';
import { Grid, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function TimeMeal() {
  return (
    <Box sx ={{p:1 }}>
        <Grid container sx={{ p: 0.5, placeItems:"center" }} direction="row" >
            <Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                Quando comi
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
            <TimePicker sx={{ pl:1 }} color='primary'></TimePicker>
            </DemoContainer>
            </LocalizationProvider>
        </Grid>
    </Box>
  );
}