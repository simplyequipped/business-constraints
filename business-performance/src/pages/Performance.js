import React from 'react';
import Grid from '@mui/material/Grid2'; 
import DatePeriodComponent from '../components/DatePeriodComponent';
import ColumnHeaderComponent from '../components/ColumnHeaderComponent';
import ConstraintComponent from '../components/ConstraintCardComponent';

export default function Performance() {
    return (
        <>
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
                <Grid item width='100%'>
                    <ConstraintComponent />
                </Grid>
            </Grid>
        </>
    );
}





