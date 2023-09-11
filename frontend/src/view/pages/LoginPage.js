import { Button, TextField, Grid, Box, Typography} from '@mui/material';
import { RepositoryInjector } from '../../repository/RepositoryInjector';
import Logo from '../../assets/images/emote_logo.png';
import React from 'react';
import { user } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field} from 'formik';

function LoginPage() {
  const repository = new RepositoryInjector().injectRepository();
  const navigate = useNavigate();

  const initialValues = {
    code: '',
    password: ''
  }

  const onSubmit = (values, props) => {
    
    const {code, password} = values;
    setTimeout(() => {
      props.resetForm();
      repository.loginUser(code, password).then((response) => {
        console.log(response);  
        user.code = response.code;
        user.role = response.role;
        user.hasAccessToApp = response.hasAccessToApp;
        if(response.hasAccessToApp){
          navigate('/', { replace: true });
        }else{ 
          alert('O seu periodo de acesso à emotE terminou, esperamos que tenha gostado da experiência!');
        }
       
    }).catch((error) => {
        props.setErrors({code: 'Código ou password incorretos :('});
        
    });
      props.setSubmitting(false);
    }, 2000);
    
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
