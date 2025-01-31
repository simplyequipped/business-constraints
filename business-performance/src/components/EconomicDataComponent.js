import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import { LineChart } from '@mui/x-charts';
import { useTheme } from '@mui/material/styles';

import { FredSeriesData, FredSeriesObservations, getDateFormatByFrequency, getTickStepByFrequency } from '../api/Fred';

export default function EconomicDataComponent({ seriesId, observationStart, observationEnd, frequency, titleOverride=null, yLabelOverride=null, citationText=null }) {
    const [seriesTitle, setSeriesTitle] = useState(null);
    const [unitsShort, setUnitsShort] = useState(null);
    const [observations, setObservations] = useState([]);
    const hasFetched = useRef(false); // prevent duplicate API calls in StrictMode (index.js, dev mode only)

    useEffect(() => {
        if (hasFetched.current) return; // skip if already fetched
        hasFetched.current = true;

        async function fetchFredData() {
            try {
                // Fetch series metadata (title)
                const seriesResponse = await FredSeriesData(seriesId);
                setSeriesTitle(seriesResponse?.seriess?.[0]?.title || `Error loading ${seriesId} series`);
                setUnitsShort(seriesResponse?.seriess?.[0]?.units_short || '');

                // Fetch observations
                const observationsResponse = await FredSeriesObservations(seriesId, observationStart, observationEnd, frequency);

                // Parse the observation data
                const parsedObservations = observationsResponse?.observations?.map(obs => ({
                    x: dayjs(obs.date).toDate(), // Convert to date object for x-axis
                    y: parseFloat(obs.value) // Convert to float for y-axis
                })) || [];

                setObservations(parsedObservations);
            } catch (error) {
                setSeriesTitle(`Error loading ${seriesId} series`);
                setObservations([]);
            }
        }
        fetchFredData();
    }, [seriesId, observationStart, observationEnd, frequency]);

    return (
        <Card elevation={3} sx={{my: 1, width: '100%'}}>
            <CardContent>
                <Grid container>
                    {/* Series Title */}
                    <Grid item width='100%'>
                        <Typography variant="h6" sx={{ padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {titleOverride || seriesTitle || `Loading ${seriesId} series data...`}
                        </Typography>
                    </Grid>

                    {/* Line Chart */}
                    <Grid item width='100%'  sx={{ height: 300, display: 'flex' }}>
                        {observations.length > 0 ? (
                            <EconomicDataLineChart
                                observations={observations} 
                                seriesTitle={titleOverride || seriesTitle} 
                                frequency={frequency} 
                                yLabel={yLabelOverride || unitsShort}
                            />
                        ) : (
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                No data available for this series
                            </Typography>
                        )}
                    </Grid>

                    {/* Citation Section */}
                    <Grid item width='100%'>
                        <Typography variant="body2" fontStyle="italic" sx={{ px: 2, pt: 1}}>
                            {citationText || ''}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

function EconomicDataLineChart({ observations, seriesTitle, frequency, yLabel }) {
  const theme = useTheme();

  return (
    <LineChart
      xAxis={[
        {
          scaleType: 'time',
          data: observations.map(d => d.x), // X-values (dates)
          valueFormatter: (date) => dayjs(date).format(getDateFormatByFrequency(frequency)), // Dynamic date format
          tickMinStep: getTickStepByFrequency(frequency), // Dynamic tick step
        }
      ]}
      yAxis={[
        {
          label: yLabel || '', // Default to "Value" if `units_short` is missing
        }
      ]}
      legend={{ hidden: true }} // Hide legend
      series={[{
        data: observations.map(d => d.y),
        label: seriesTitle,
        showMark: true,
        color: theme.palette.customColors['green'],
      }]}
      xs={12}
      sx={{
        [`& .MuiLineElement-root`]: {
          strokeWidth: 2, // Customize line thickness
          stroke: theme.palette.customColors['green'],
        },
        [`& .MuiMarkElement-root`]: {
          scale: '0', // Hide data point marks
        },
      }}
    />
  );
}
