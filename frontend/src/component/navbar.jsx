import React, { useState } from 'react';
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainPageButton from '../component/mainpagebutton';
import MenuIcon from '@mui/icons-material/Menu';
import Mainpagesidebarbutton from './mainpagesidebarbutton';
import logo from '../image/DemoCreatorSnap_2023-08-08 19-50-59.png'
const NavBar = ({ setActiveComponent }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleButtonsideClick = (component) => {
    setActiveComponent(component);
    setShowSideDrawer(false); // Close the side drawer when a main page button is clicked
  };

  const handleMenuIconClick = () => {
    setShowSideDrawer(!showSideDrawer); // Toggle side drawer visibility
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleMenuIconClick}
            >
              <MenuIcon />
            </IconButton>
            
          )}
     <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: 'block' }}>
      <img src={logo} alt="Logo" style={{ marginRight: '8px', verticalAlign: 'middle', height: '24px' }} />
      DataChartSeries
    </Typography>

          {isSmallScreen ? (
            <Drawer
              anchor="left"
              open={showSideDrawer}
              onClose={() => setShowSideDrawer(false)}
            
            >
              <Mainpagesidebarbutton
                handleButtonsideClick={handleButtonsideClick}
              />
            </Drawer>
          ) : (
            <MainPageButton handleButtonClick={handleButtonClick}  />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
