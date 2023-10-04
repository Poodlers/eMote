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
import { Link, useNavigate } from 'react-router-dom';

import { IconButton, Link as MUILink } from '@mui/material';
import LogoutButton from './LogoutButton';


const themes = [
  {
      name: "orange",
      logo: LogoOrange,
      color: "#f48d0d",
      link: "/moduleintro/1"
  },
  {
      name: "green",
      logo: LogoGreen,
      color: "#519a96",
      link: "/moduleintro/2"
  },
  
  {
      name: "purple",
      logo: LogoPurple,
      color: "#a87e95",
      link: "/moduleintro/3"
  },
  {
      name: "blue",
      logo: LogoBlue,
      color: "#52b9c4",
      link: "/moduleintro/4"
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
          <LogoutButton/>
          <MUILink href="/home" sx ={{p:2}}>
            <img alt="logo" src={modified? theme.logo : Logo} height={35}/>
          </MUILink>
          
        </Toolbar>
      </AppBar>
  );
}