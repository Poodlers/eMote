import * as React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import Home from '../../assets/images/home.png';
import Favoritos from '../../assets/images/favoritos.png';
import Progresso from '../../assets/images/progresso_1.png';
import Perfil from '../../assets/images/perfil.png';

export function NavBar() {

  return (
    <BottomNavigation
        sx={{ left: 0, bottom:0, position: 'fixed', width: '100%', bgcolor: "#077088", alignItems: 'center' }}
    >
      <BottomNavigationAction component={Link} to="/" label="Home" icon={<img alt='home' src={Home} height={25}/>}/>
      <BottomNavigationAction component={Link} to="/favorites" label="Favoritos" icon={<img alt='fav' src={Favoritos} height={25}/>}/>
      <BottomNavigationAction component={Link} to="/progress" label="Progresso" icon={<img alt='prog' src={Progresso} height={25}/>}/>
      <BottomNavigationAction component={Link} to="/profile" label="Perfil" icon={<img alt='prof' src={Perfil} height={25}/>}/>

    </BottomNavigation>
  );
}