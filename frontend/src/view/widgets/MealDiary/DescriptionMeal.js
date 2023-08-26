import * as React from 'react';
import { Box, Link, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function DescriptionMeal(props) {
  return (
    <Box sx ={{ p: 0.5 }}>
        <Link href={props.href} underline='none'>
            <Box sx ={{ p:1, bgcolor: '#349db7' }}>
                <Typography gutterBottom sx={{ pt:1, pl:1, fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    O que comi e bebi
                </Typography>
                <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        color='info'
                        fullWidth
                    />
            </Box>
        </Link>
    </Box>
  );
}