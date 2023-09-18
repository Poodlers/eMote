import { Button, TextField, Grid, Box, Typography} from '@mui/material';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import Logo from '../../assets/images/emote_logo.png';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field} from 'formik';

function LoginPage() {
  const repository = RepositorySingleton.getInstance().injectRepository();
  const navigate = useNavigate();

  const initialValues = {
    code: '',
    password: ''
  }

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if(loggedUser === null) return;
    repository.updateUser();
    repository.logTimeStampOnAppLogin();
    
    
    if(loggedUser.role === 3){
      navigate('/admin', { replace: true });
    }else if(loggedUser.hasAccessToApp){
      navigate('/home', { replace: true });

    }
    
    
    
    // eslint-disable-next-line
  }, []);

  const onSubmit = (values, props) => {
    
    const {code, password} = values;
    setTimeout(() => {
      props.resetForm();
      repository.loginUser(code, password).then((response) => {
        console.log(response);  
        const loggedUser = {
          code: response.code,
          role: response.role,
          hasAccessToApp: response.hasAccessToApp
        }
        localStorage.setItem('user', JSON.stringify(loggedUser));
        repository.updateUser();
        repository.logTimeStampOnAppLogin();

        if(response.role === 3){
          navigate('/admin', { replace: true });
        }else if(response.hasAccessToApp){
          navigate('/home', { replace: true });
          // log the access
         
        }else{ 
          alert('O seu periodo de acesso à emotE terminou, esperamos que tenha gostado da experiência!');
        }
       
    }).catch((error) => {
        props.setErrors({code: 'Código ou password incorretos :('});
        
    });
      props.setSubmitting(false);
    }, 1000);
    
  }
  return (
    document.body.style = 'background: #077088',
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="95vh"
          marginX={5}
        >
            <Grid container  direction="column" justifyContent="center"  >

              <Box
                component="img"
                sx={{
                  maxWidth: { xs: 350, md: 250 },
                  margin: 'auto',
                  marginBottom: '150px'
                }}
                src= {Logo}
              />
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(props) => (
                
                  <Form> 
                    <Grid container  direction="column" justifyContent="center"  >
                    <Field as={TextField}  name='code' id="outlined-basic" color="success"  margin='normal' required label="Código" variant="standard"
                  sx={{marginBottom: '20px'}} 
                 
                    />

                    <Field as={TextField} name='password' id="filled-basic" type='password' color="success"  margin='normal' required label="Password" variant="standard" 
                   sx={{marginBottom: '20px'}}
                    />
                    {props.errors.code ? <Typography sx={{ fontSize: 20, p:2.5}} 
                     variant="h5" align='center' color="secondary">
                      {props.errors.code}
                    </Typography> : null}
                    <Button type='submit' disabled={props.isSubmitting} sx={{width : '40%', margin: 'auto'}} color='warning' variant="contained">
                      
                      {props.isSubmitting ? 'Loading...' : 'Registar'}
                      
                      </Button>
                    
                    </Grid>
                </Form>
                
                )}

              </Formik>
            
            </Grid>
        </Box>
  );
}

export default LoginPage;