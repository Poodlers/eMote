import * as React from 'react';
import { Grid, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


export default function TimeMeal(props) {
 
  return (

    <Box sx ={{p: 0.5 }}>
        <Grid container sx={{ p: 0.5, placeItems:"center" }} direction="row" >
            <Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                Quando comi
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx= {{color: 'black'}} components={['TimePicker']}>
            <MobileTimePicker  
        
            disabled={props.readOnly}
            value={ dayjs(new Date().toLocaleDateString(
                'fr-CA'
            )+ "T" + props.initialValue)}
            onAccept={
                (date) => { 
                   console.log(date);
                    props.setTimeOfMeal(date.$d.toLocaleTimeString().split(' ')[0]);
                } 
            } sx={{ pl:1, color: 'black'}}></MobileTimePicker >
            </DemoContainer>
            </LocalizationProvider>
        </Grid>
    </Box>
  );
}