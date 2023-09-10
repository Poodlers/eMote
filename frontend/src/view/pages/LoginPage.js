import { Button, TextField, Grid, Box} from '@mui/material';
import { RepositoryInjector } from '../../repository/RepositoryInjector';
import React from 'react';

function LoginPage() {
  const repository = new RepositoryInjector().injectRepository();
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const login = () => {
    return repository.loginUser(code, password).then((response) => {
        console.log(response);  
    }).catch((error) => {
        console.log(error);
    });
  }
  return (
    document.body.style = 'background: #077088',
        <Box sx={{height: '100vh', margin: 'auto'}}>
            <Grid container sx={{p: 2}} direction="column" justifyContent="center" alignSelf="center">
                
                <TextField id="outlined-basic" color="success"  value={code} margin='normal' label="Código" variant="standard"
                onChange={(event) => setCode(event.target.value)}
                />

                <TextField id="filled-basic" type='password' color="success"  margin='normal' value={password} label="Password" variant="standard" 
                onChange={(event) => setPassword(event.target.value) }
                />

                <Button sx={{width : '50%', margin: 'auto'}} color='warning' variant="contained" onClick={login}>Login</Button>
            
            </Grid>
        </Box>
  );
}

export default LoginPage;
