import React from 'react';
import Grid from '@mui/material/Grid2'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import { Outlet } from 'react-router';

import MenuComponent from '../components/MenuComponent';
import LogoComponent from '../components/LogoComponent';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    customColors: {
      green: green[600],
      orange: orange[400],
      red: red[400],
    },
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={3} />

        <Grid container direction="column" width={{xs: '100%', md: '50%'}} sx={{ padding: 2,  margin: '0 auto' }}>

            <Grid container alignItems="center" justifyContent='space-between' sx={{ padding: '15px' }}>
                {/* logo and menu row */}
                <Grid item xs={6}>
                    <LogoComponent />
                </Grid>
                <Grid item xs={6}>
                    <MenuComponent />
                </Grid>
            </Grid>

            {/* router outlet */}
            <Outlet />

        </Grid>

        <Grid item xs={3} />
      </Grid>
    </ThemeProvider>
  );
}

