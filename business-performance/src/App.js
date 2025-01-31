import React from 'react';
import Grid from '@mui/material/Grid2'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

import MenuComponent from './common/MenuComponent';
import LogoComponent from './common/LogoComponent';
import DatePeriodComponent from './date_period/DatePeriodComponent';
import ColumnHeaderComponent from './constraint_card/ColumnHeaderComponent';
import ConstraintComponent from './constraint_card/ConstraintCardComponent';

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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={3} />

        <Grid container direction="column" xs={6} sx={{ padding: 2,  margin: '0 auto' }}>

          <Grid container alignItems="center" justifyContent='space-between' sx={{ padding: '15px' }}>
            {/* logo and menu row*/}
            <Grid item xs={6}>
              <LogoComponent />
            </Grid>
            <Grid item xs={6}>
              <MenuComponent />
            </Grid>
          </Grid>

          <Grid container>
            {/* period selection row */}
            <Grid item width='100%'>
              <DatePeriodComponent />
            </Grid>
          </Grid>

          <Grid container>
            {/* column header row */}
            <Grid item width='100%'>
              <ColumnHeaderComponent />
            </Grid>
          </Grid>

          <Grid container>
            {/* constraint cards row */}
            <Grid item>
              <ConstraintComponent />
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={3} />
      </Grid>
    </ThemeProvider>
  );
}

