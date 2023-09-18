import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Logo from '../../assets/images/icon_azul.png';
import { IconButton, Link } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { useNavigate } from 'react-router-dom';


export function LogoAppBar() {
  const repository = RepositorySingleton.getInstance().injectRepository();
  const navigate = useNavigate();

  const handleLogout = () => {
    repository.logOutUser();
    navigate('/');
  }

  return (
      <AppBar sx ={{boxShadow: 'none', top:0, height: 60 }} >
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleLogout}>
            <Logout></Logout>
          </IconButton>

          <Link href="/home" sx ={{p:2}}>
            <img alt="logo" src={Logo} height={35}/>
          </Link>
          
          
        </Toolbar>
      </AppBar>
  );
}