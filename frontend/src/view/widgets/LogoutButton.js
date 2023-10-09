import {React} from 'react';
import { IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { useNavigate } from 'react-router-dom';


function LogoutButton(props){
    const repository = RepositorySingleton.getInstance().injectRepository();
    const navigate = useNavigate();
    const handleLogout = () => {
        repository.logOutUser();

        //unregister all serviceWorkers
        navigator.serviceWorker
        .getRegistrations()
        .then(function (registrations) {
          for (let registration of registrations) {
            registration.unregister();
           
          }
        });
        navigate('/');
      }

      return(
        <IconButton edge="start" sx={{ mr: 2, ':hover': {backgroundColor: 'transparent'}}} onClick={handleLogout}>
            <Logout style={{fontSize: props.size}}></Logout>
        </IconButton>
      )
}

export default LogoutButton;