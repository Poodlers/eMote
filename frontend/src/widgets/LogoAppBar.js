import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MyImage from '../images/icon_azul.png';
import { Button } from '@mui/material';

export function LogoAppBar() {
  return (
      <AppBar sx ={{boxShadow: 'none', top:0, height: 60 }} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <Button sx ={{p:2}}>
            <img src={MyImage} height={35}/>
          </Button>
          
        </Toolbar>
      </AppBar>
  );
}