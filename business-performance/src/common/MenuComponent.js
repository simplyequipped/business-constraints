import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function MenuComponent() {
  const [anchorElement, setAnchorElement] = useState(null);
  const isMenuOpen = Boolean(anchorElement);
  
  const handleMenuOpen = (event) => { setAnchorElement(event.currentTarget) };
  const handleMenuClose = () => { setAnchorElement(null) };

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleMenuOpen} aria-label="menu">
          <MenuIcon sx={{ fontSize: '2.5rem' }} />
      </IconButton>

      <Menu
          anchorEl={anchorElement}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
      >
          <MenuItem onClick={handleMenuClose}>Overview</MenuItem>
          <MenuItem onClick={handleMenuClose}>Performance</MenuItem>
          <MenuItem onClick={handleMenuClose}>Economic Data</MenuItem>
          <MenuItem onClick={handleMenuClose}>Data Sources</MenuItem>
      </Menu>
    </>
  );
}
