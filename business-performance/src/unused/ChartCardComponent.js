import * as React from 'react';
import {
  ResponsiveChartContainer,
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const pData = [34000, 35000, 32000, 32500, 37500, 35804, 42123];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const LineGraph = () => {
  const theme = useTheme();

  return (
    <div style={{ position: 'relative', width: "100%" }}>
        <ResponsiveChartContainer
          height={200}
          series={[{ type: 'line', data: pData }]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          sx={{
              [`& .${lineElementClasses.root}`]: {
              stroke: theme.palette.customColors['green'],
              strokeWidth: 2,
              },
              [`& .${markElementClasses.root}`]: {
              scale: '0', // hide data point mark element
              },
          }}
          margin={{top: 0, bottom: 10, left: 10, right: 10}}
          disableAxisListener
        >
        <LinePlot />
        <MarkPlot />
        </ResponsiveChartContainer>
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                position: 'absolute',   // Overlay on the graph
                bottom: 10,             // 10px from the bottom
                left: 10,               // 10px from the left
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: translucent background
                padding: '2px 4px',     // Optional: padding for readability
                borderRadius: '4px',    // Optional: rounded corners
            }}
        >
            Gross Sales
        </Typography>
    </div>
  );
}

export default LineGraph
