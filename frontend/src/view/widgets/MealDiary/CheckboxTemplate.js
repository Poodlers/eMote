import * as React from 'react';
import { Grid, Box, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function CheckboxTemplate(props) {
  return (
    <Box sx ={{p: 0.5 }}>
        <Grid container spacing={2} sx={{ p: 0.5 }} direction="row" >
            <Grid item xs={10}>
                <Typography gutterBottom sx={{ pt:1, fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    {props.text}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Checkbox id={props.id} color='info'
                checked={props.initialValue}
                disabled={props.readOnly}
                onChange={
                    (event) => {
                        props.setCheck(event.target.checked);
                    }
                }
                ></Checkbox>
            </Grid>
        </Grid>
        {props.note? 
            <Typography gutterBottom sx={{ pl:3, pb: 0.5, mr:8, fontSize: 15, fontWeight: 200 }} variant='body1' color={"white"}>
                {props.note}
            </Typography>
        : null
        }
    </Box>
  );
}