import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MyImage from '../../assets/images/icon_azul.png';
import { Link } from '@mui/material';

export function LogoAppBar() {
  return (
      <AppBar sx ={{boxShadow: 'none', top:0, height: 60 }} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <Link href="/" sx ={{p:2}}>
            <img src={MyImage} height={35}/>
          </Link>
          
        </Toolbar>
      </AppBar>
  );
}