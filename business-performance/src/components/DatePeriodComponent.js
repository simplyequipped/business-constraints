import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MenuItem, FormControl, Collapse, Box, Card, CardContent, InputLabel, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function DatePeriodComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const handleOptionChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <Card elevation={0} sx={{'&:last-child': { py: 0, my: 0 }, '&:fist-child': { py: 0, my: 0 }}}>
      <CardContent width='100%' sx={{'&:last-child': { pb: 0, mb: 0 }}}>
        <Grid container>
          <Grid item width={{xs: '100%', md: '50%'}} sx={{display: { xs: 'none', md: 'block' }}}/>
          <Grid item width={{xs: '33%', md: '20%'}} textAlign='center' sx={{padding: '5px'}}>
            <DatePeriod selectedOption={selectedPeriod} onOptionChange={handleOptionChange}>Period</DatePeriod>
          </Grid>
          <Grid item width={{xs: '33%', md: '20%'}} textAlign='center' sx={{padding: '5px'}}>
            <DatePeriod selectedOption={selectedPeriod} onOptionChange={handleOptionChange}>Period</DatePeriod>
          </Grid>
          <Grid item width={{xs: '33%', md: '10%'}} sx={{padding: '5px', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            &nbsp;
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function DatePeriod({selectedOption, onOptionChange, children}) {
  const [startDateValue, setStartDateValue] = useState(dayjs());
  const [endDateValue, setEndDateValue] = useState(dayjs());

  return (

    <Grid container direction="column" spacing={1} width='100%'>
      <Grid item width='100%' textAlign='left'>
        <FormControl fullWidth variant="outlined">
      <InputLabel id="time-period-label">{children}</InputLabel>
      <Select
        labelId="time-period-label"
        label={children}
        value={selectedOption}
        onChange={onOptionChange}
        fullWidth
      >
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="quarter">Quarter</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item width='100%'>
        <Collapse in={selectedOption === 'custom'} timeout={300}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <DatePickerComponent dateValue={startDateValue} onDateChange={setStartDateValue}>
                Start Date
              </DatePickerComponent>
            </Grid>
            <Grid item>
              <DatePickerComponent dateValue={endDateValue} onDateChange={setEndDateValue}>
                End Date
              </DatePickerComponent>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
}

function DatePickerComponent({ dateValue, onDateChange, children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%' }}>
        <DatePicker
          label={children}
          views={['year', 'month', 'day']}
          value={dateValue}
          onChange={onDateChange}
          disableFuture={true}
          sx={{ width: '100%' }}
        />
      </Box>
    </LocalizationProvider>
  );
}
