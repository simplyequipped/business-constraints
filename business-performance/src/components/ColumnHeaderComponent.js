import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


export default function ColumnHeaderComponent() {
  return (
    <Card elevation={0} sx={{'&:last-child': { py: 0, my: 0 }}}>
      <CardContent width='100%' sx={{'&:last-child': { py: 0, my: 0 }}}>
        <Grid container>
          <Grid item width={{xs: '100%', md: '50%'}} sx={{display: { xs: 'none', md: 'block' }}}/>
          <Grid item width={{xs: '33%', md: '20%'}} sx={{padding: '5px', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            <Typography  variant='h6' fontStyle='italic'>Prior</Typography>
          </Grid>
          <Grid item width={{xs: '33%', md: '20%'}} sx={{padding: '5px', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
          <Typography  variant='h6' fontStyle='italic'>Current</Typography>
          </Grid>
          <Grid item width={{xs: '33%', md: '10%'}} sx={{padding: '5px', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
          <Typography  variant='h6' fontStyle='italic'>Change</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
