import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import Home from './images/home.png';
import Favoritos from './images/favoritos.png';
import Progresso from './images/progresso_1.png';
import Perfil from './images/perfil.png';

export function NavBar() {
const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        sx={{ left: 0, bottom:0, position: 'absolute', width: '100%', bgcolor: "#077088" }}
    >
        <Toolbar>
            <BottomNavigationAction label="Home" icon={<img src={Home} height={25}/>}/>
            <BottomNavigationAction label="Favoritos" icon={<img src={Favoritos} height={25}/>}/>
            <BottomNavigationAction label="Progresso" icon={<img src={Progresso} height={25}/>}/>
            <BottomNavigationAction label="Perfil" icon={<img src={Perfil} height={25}/>}/>
        </Toolbar>
    </BottomNavigation>
  );
}