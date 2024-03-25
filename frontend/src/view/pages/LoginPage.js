import { Button, TextField, Grid, Box, Typography} from '@mui/material';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import Logo from '../../assets/images/emote_logo.png';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field} from 'formik';
import TermsOfService from '../widgets/TermsOfService';


const newEvent = new MouseEvent("user-login", {
  view: window,
  bubbles: true,
  cancelable: true,
});

   
const cb = document.getElementById("main-body");

function LoginPage() {
  const repository = RepositorySingleton.getInstance().injectRepository();
  const navigate = useNavigate();
  const [hasSeenTermsOfService, setHasSeenTermsOfService] = React.useState(true);
  const initialValues = {
    code: '',
    password: ''
  }

  useEffect(() => {
    
    let loggedUser = JSON.parse(localStorage.getItem('user'));
    if(loggedUser === null) return;
    repository.loginUser(loggedUser.code, loggedUser.password).then((response) => {
      if (!response.hasAccessToApp) {
        alert('O seu periodo de acesso à eMOTE terminou, esperamos que tenha gostado da experiência!');
        return;
      }
      loggedUser.role = response.role;
      localStorage.setItem('user', JSON.stringify(loggedUser));

      repository.updateUser();
      repository.logTimeStampOnAppLogin();
      repository.setUserCompletedLogin(true);
      cb?.dispatchEvent(newEvent);
      
      if(loggedUser.role === 3){
        navigate('/admin', { replace: true });
      }else if(loggedUser.hasAccessToApp){
        navigate('/home', { replace: true });

      }
      }).catch((error) => {
        console.log(error);
      });
      
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
          password: response.password,
          notifsPerDay : response.notifsPerDay,
          hasAccessToApp: response.hasAccessToApp,
          completedLogin: false
        }
        localStorage.setItem('user', JSON.stringify(loggedUser));
        repository.updateUser();
        repository.logTimeStampOnAppLogin();

   
        cb?.dispatchEvent(newEvent);
        
        
        //setHasSeenTermsOfService(response.accesses.length > 0);

        const hasAccessedOnce = response.accesses.length > 0;
        setHasSeenTermsOfService(hasAccessedOnce);
       
        if(repository.userCompletedLogin() || hasAccessedOnce){
          repository.setUserCompletedLogin(true);
          if(response.role === 3){
            navigate('/admin', { replace: true });
          }else if(response.hasAccessToApp){
            navigate('/home', { replace: true });
            // log the access
            
          }else{ 
            alert('O seu periodo de acesso à eMOTE terminou, esperamos que tenha gostado da experiência!');
          }
        }
       
    }).catch((error) => {
        props.setErrors({code: 'Código ou password incorretos :('});
        
    });
      props.setSubmitting(false);
    }, 1000);
    

  }

  const onAgree = () => {
    setHasSeenTermsOfService(true);
    repository.setUserCompletedLogin(true);
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if(loggedUser.role === 3){
      navigate('/admin', { replace: true });
    }else if(loggedUser.hasAccessToApp){
      navigate('/home', { replace: true });
      // log the access
      
    }else{ 
      alert('O seu periodo de acesso à eMOTE terminou, esperamos que tenha gostado da experiência!');
    }
  }
  return (
        <Box
          sx = {{backgroundColor : "#077088"}}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          paddingX={6}
        >
           <TermsOfService trigger={!hasSeenTermsOfService} onAgree= {onAgree} onDisagree={setHasSeenTermsOfService} ></TermsOfService>
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
