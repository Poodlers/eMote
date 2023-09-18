import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Logo from '../../assets/images/icon.png';
import LogoBlue from '../../assets/images/icon_azul.png';
import LogoOrange from '../../assets/images/icon_laranja.png';
import LogoGreen from '../../assets/images/icon_verde.png';
import LogoPurple from '../../assets/images/icon_rosa.png';

import { IconButton, Link } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { RepositorySingleton } from '../../repository/RepositoryInjector';
import { useNavigate } from 'react-router-dom';

import { IconButton, Link as MUILink } from '@mui/material';


const themes = [
  {
      name: "orange",
      logo: LogoOrange,
      color: "#f48d0d",
      link: "/module1"
  },
  {
      name: "green",
      logo: LogoGreen,
      color: "#519a96",
      link: "/module2"
  },
  
  {
      name: "purple",
      logo: LogoPurple,
      color: "#a87e95",
      link: "/module3"
  },
  {
      name: "blue",
      logo: LogoBlue,
      color: "#52b9c4",
      link: "/module4"
  },
]

export function LogoAppBar(props) {
  var theme = null;
  var modified = false;

  for (const obj of themes) {
      if (obj.name === props.color) {
          theme = obj;
          modified = true;
      }
  }
  const repository = RepositorySingleton.getInstance().injectRepository();
  const navigate = useNavigate();

  const handleLogout = () => {
    repository.logOutUser();
    navigate('/');
  }

  return (
      <AppBar sx ={{boxShadow: 'none', top:0, height: 60, backgroundColor: modified? "#ffffff" : null }} >
        <Toolbar>
          {props.goBack? 
            <IconButton component={Link} to={theme.link} aria-label="back" size="large">
              <ArrowBackIosIcon htmlColor={theme.color} fontSize="inherit" />
            </IconButton>
            : null
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleLogout}>
            <Logout></Logout>
          </IconButton>
          <MUILink href="/" sx ={{p:2}}>
            <img alt="logo" src={modified? theme.logo : Logo} height={35}/>
          </MUILink>

          

          
          
        </Toolbar>
      </AppBar>
  );
}