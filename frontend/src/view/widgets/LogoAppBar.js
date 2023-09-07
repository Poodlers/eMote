import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Logo from '../../assets/images/icon.png';
import LogoBlue from '../../assets/images/icon_azul.png';
import LogoOrange from '../../assets/images/icon_laranja.png';
import LogoGreen from '../../assets/images/icon_verde.png';
import LogoPurple from '../../assets/images/icon_rosa.png';

import { Link } from '@mui/material';

const themes = [
  {
      name: "orange",
      logo: LogoOrange
  },
  {
      name: "green",
      logo: LogoGreen
  },
  {
      name: "purple",
      logo: LogoPurple
  },
  {
      name: "blue",
      logo: LogoBlue
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <Link href="/" sx ={{p:2}}>
            <img alt="logo" src={modified? theme.logo : Logo} height={35}/>
          </Link>
          
        </Toolbar>
      </AppBar>
  );
}