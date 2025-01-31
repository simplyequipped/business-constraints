import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router';


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
          <MenuItem onClick={handleMenuClose} component={Link} to='/'>Performance</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to='/economy'>Economic Data</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to='/account'>Account</MenuItem>
      </Menu>
    </>
  );
}
