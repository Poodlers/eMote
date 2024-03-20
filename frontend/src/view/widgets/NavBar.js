import * as React from 'react';
import { Link as MUILink } from '@mui/material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import Home from '../../assets/images/home.png';
import HomeGreen from '../../assets/images/home_verde.png';
import HomePurple from '../../assets/images/home_rosa.png';
import HomeOrange from '../../assets/images/home_laranja.png';

import Favoritos from '../../assets/images/favoritos.png';
import FavoritosGreen from '../../assets/images/favoritos_verde.png';
import FavoritosPurple from '../../assets/images/favoritos_rosa.png';
import FavoritosOrange from '../../assets/images/favoritos_laranja.png';

import Progresso from '../../assets/images/progresso.png';
import ProgressoGreen from '../../assets/images/progresso_verde.png';
import ProgressoPurple from '../../assets/images/progresso_rosa.png';
import ProgressoOrange from '../../assets/images/progresso_laranja.png';

import Perfil from '../../assets/images/perfil.png';
import PerfilGreen from '../../assets/images/perfil_verde.png';
import PerfilPurple from '../../assets/images/perfil_rosa.png';
import PerfilOrange from '../../assets/images/perfil_laranja.png';

const themes = [
  {
      name: "orange",
      color: "#f48d0d",
      home: HomeOrange,
      favorites: FavoritosOrange,
      progress: ProgressoOrange,
      profile: PerfilOrange
  },
  {
      name: "green",
      color: "#519a96",
      home: HomeGreen,
      favorites: FavoritosGreen,
      progress: ProgressoGreen,
      profile: PerfilGreen
  },
  {
      name: "purple",
      color: "#a87e95",
      home: HomePurple,
      favorites: FavoritosPurple,
      progress: ProgressoPurple,
      profile: PerfilPurple
  },
  {
      name: "blue",
      color: "#52b9c4",
      home: Home,
      favorites: Favoritos,
      progress: Progresso,
      profile: Perfil
  },
]

export function NavBar(props) {
  var theme = null;
  var modified = false;

  for (const obj of themes) {
      if (obj.name === props.color) {
          theme = obj;
          modified = true;
      }
  }
  return (
    <BottomNavigation
        sx={{ left: 0, bottom:0, position: 'fixed', width: '100%', bgcolor: "#077088",
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: modified? theme.color : null, }}
        
    >
      <MUILink href="/home"  >
        <img alt='home' src={modified? theme.home : Home} height={25} />
      </MUILink>
      <MUILink href="/favorites" >
        <img alt='fav' src={modified? theme.favorites : Favoritos} height={25}/>
      </MUILink>
      <MUILink href="/progress" >
        <img alt='prog' src={modified? theme.progress : Progresso} height={25}/>
      </MUILink>
      <MUILink href="/profile"  >
        <img alt='prof' src={modified? theme.profile : Perfil} height={25}/>
      </MUILink>
    

    </BottomNavigation>
  );
}