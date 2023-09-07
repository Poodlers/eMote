import * as React from 'react';
import { Box, Button } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function ConfirmButton(props) {
  return (
    <Box sx ={{ p:3 }} textAlign='center'>
            <Button sx ={{ p:1, bgcolor: '#349db7' }}>
                <Typography gutterBottom sx={{ pt:1, textAlign: 'center', fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Confirmar
                </Typography>
            </Button>
    </Box>
  );
}