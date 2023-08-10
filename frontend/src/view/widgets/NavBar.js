import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import Home from '../../assets/images/home.png';
import Favoritos from '../../assets/images/favoritos.png';
import Progresso from '../../assets/images/progresso_1.png';
import Perfil from '../../assets/images/perfil.png';

export function NavBar() {
const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        sx={{ left: 0, bottom:0, position: 'fixed', width: '100%', bgcolor: "#077088" }}
    >
        <Toolbar>
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<img src={Home} height={25}/>}/>
            <BottomNavigationAction component={Link} to="/favorites" label="Favoritos" icon={<img src={Favoritos} height={25}/>}/>
            <BottomNavigationAction component={Link} to="/progress" label="Progresso" icon={<img src={Progresso} height={25}/>}/>
            <BottomNavigationAction component={Link} to="/profile" label="Perfil" icon={<img src={Perfil} height={25}/>}/>
        </Toolbar>
    </BottomNavigation>
  );
}