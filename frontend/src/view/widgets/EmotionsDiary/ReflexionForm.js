import * as React from 'react';
import { Grid, Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


export default function ReflexionForm(props) {
  const { dayReflection, setDayReflection, canEdit } = props;
  return (
    <Box sx ={{p:1 }}>
        
            <Box sx ={{p:1, bgcolor: '#ec6fa7'}}>
                <Grid container sx={{ p: 0.5 }} direction="row" justifyContent="center">
                    <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                        Reflexão do dia e dos exercícios.
                    </Typography>
                    <TextField
                        id="reflexion"
                        disabled={!canEdit}
                        defaultValue={dayReflection}
                        multiline
                        rows={4}
                        color='info'
                        fullWidth
                        onChange={(event) => setDayReflection(event.target.value)}
                    />
                </Grid>
            </Box>
        
    </Box>
  );
}