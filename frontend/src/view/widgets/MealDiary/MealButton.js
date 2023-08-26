import * as React from 'react';
import { Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function MealButton(props) {
  return (
    <Box sx ={{ p:0.5 }}>
        <Link href={props.href} underline='none'>
            <Box sx ={{ p:1, bgcolor: '#349db7' }}>
                <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    {props.meal}
                </Typography>
            </Box>
        </Link>
    </Box>
  );
}