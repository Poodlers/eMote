import * as React from 'react';
import { Box, Link, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';


export default function CommentsMeal(props) {
  return (
    <Box sx ={{ p:0.5 }}>
        <Link href={props.href} underline='none'>
            <Box sx ={{ p:1, bgcolor: '#349db7' }}>
                <Typography gutterBottom sx={{ pt:1, pl:1, fontSize: 18, fontWeight: 500 }} variant='body1' color={"white"}>
                    Comentários
                </Typography>
                <TextField
                        id='comments'
                        multiline
                        rows={4}
                        color='info'
                        disabled={props.readOnly}
                        value={props.initialValue}
                        fullWidth
                        onChange={
                            (event) => {
                                props.setReflection(event.target.value);
                            } 
                        }
                    />
            </Box>
        </Link>
    </Box>
  );
}