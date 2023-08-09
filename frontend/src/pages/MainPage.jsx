import React,{useState} from 'react';
import { Typography,InputBase, Box, AppBar, Toolbar, IconButton,Button  } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MainPageMain from '../component/mainpage'

import MenuIcon from '@mui/icons-material/Menu'
import NavBar from '../component/navbar';
import Mainpagesidebarbutton from '../component/mainpagesidebarbutton';
export default function MainPage (){
    const [activeComponent, setActiveComponent] = useState(null);
   return(
    <>
    <NavBar setActiveComponent={setActiveComponent} />
      <MainPageMain activeComponent={activeComponent} />
    </>
   )
}