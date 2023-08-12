import * as React from 'react';
import { Grid, Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function EmotionsButton(props) {
  return (
    <Box sx ={{p:1 }}>
        <Link href="#" underline='none'>
            <Box sx ={{p:1, bgcolor: '#ec6fa7'}}>
                <Grid container sx={{ p: 0.5 }} direction="row" justifyContent="center">
                    <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                        Como me senti hoje?
                    </Typography>
                    <KeyboardArrowRightIcon fontSize='large' htmlColor='#fff'/>
                </Grid>
            </Box>
        </Link>
    </Box>
  );
}