import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Divider, useMediaQuery, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import OpenAIQuery from '../api/OpenAI';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

async function buildInsight(constraint) {
  const systemMessage = `For the purpose of this conversation, business constraints means only these:
                        maximum gross sales, average ticket sales, churn rate, maximum number of customers,
                        customer lifetime value. Target audience is the average small business owner. Do not use semicolons.`;

  const userMessage = `In one sentence, tell me about the ${constraint} business constraint. In one more sentence, tell me what a reasonable target would be in the automotive tire and wheels industry.`;

  return await OpenAIQuery(systemMessage, userMessage);
}


export default function ConstraintComponent() {
  const [insights, setInsights] = useState({
    maxGrossSales: '',
    avgTicketSales: '',
    churnRate: '',
    maxCustomers: '',
    customerLTV: '',
  });

  // prevent duplicate API calls due to StrictMode (index.js, dev only)
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // skip if already fetched
    hasFetched.current = true;

    async function fetchInsights() {
      try {
        const [
          maxGrossSales,
          avgTicketSales,
          churnRate,
          maxCustomers,
          customerLTV
        ] = await Promise.all([
          buildInsight('maximum gross sales'),
          buildInsight('average ticket sales'),
          buildInsight('churn rate'),
          buildInsight('maximum number of customers'),
          buildInsight('customer lifetime value')
        ]);

        setInsights({
          maxGrossSales,
          avgTicketSales,
          churnRate,
          maxCustomers,
          customerLTV,
        });
      } catch (error) {
        console.error("Failed to load insights:", error);
        setInsights({
          maxGrossSales: "Error loading insights :-(",
          avgTicketSales: "Error loading insights :-(",
          churnRate: "Error loading insights :-(",
          maxCustomers: "Error loading insights :-(",
          customerLTV: "Error loading insights :-(",
        });
      }
    }

    fetchInsights();
  }, []);

  return (
    <>
      <ConstraintCard constraintTitle='Maximum Gross Sales' constraintValue='$42,123' insightValue={insights.maxGrossSales} />
      <ConstraintCard constraintTitle='Average Ticket Sales' constraintValue='$234' insightValue={insights.avgTicketSales} />
      <ConstraintCard constraintTitle='Churn Rate' constraintValue='37%' insightValue={insights.churnRate} />
      <ConstraintCard constraintTitle='Maximum Customers' constraintValue='317' insightValue={insights.maxCustomers} />
      <ConstraintCard constraintTitle='Lifetime Value per Customer' constraintValue='$673' insightValue={insights.customerLTV} />
    </>
  );
}

function ConstraintCard({ constraintTitle, constraintValue, insightValue }) {

  return (
    <Card elevation={3} sx={{my: 1}}>
      <CardContent width='100%'>
        <Grid container>
          <Grid item width={{xs: '100%', md: '50%'}} mb={{xs: 1, md: 0}}>
            <Typography variant='h6' display={{ xs: 'none', md: 'block' }} color='black'>{constraintTitle}</Typography>
            <Typography variant='body2' textTransform='uppercase' display={{ xs: 'block', md: 'none' }} color='text.secondary'>{constraintTitle}</Typography>
          </Grid>
          <Grid item width={{xs: '32%', md: '20%'}} textAlign='center'>
            <Typography variant='h6'>{constraintValue}</Typography>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item width={{xs: '33%', md: '20%'}} textAlign='center'>
            <Typography variant='h6'>{constraintValue}</Typography>
          </Grid>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Grid item width={{xs: '33%', md: '9%'}} textAlign='center'>
            <Typography variant='h6' color='text.secondary'>10%</Typography>
          </Grid>
        </Grid>
      </CardContent>
      
      <ConstraintInsight>{insightValue}</ConstraintInsight>
    </Card>
  );
}

function ConstraintInsight({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const insightText = typeof children === 'string' ? children : '';
  const insightSentences = insightText.split(/(?<=\.)\s+/).filter(Boolean);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography component="span" color="text.secondary" variant='body2' textTransform={{xs: 'uppercase', md: 'capitalize'}}>Insights</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isMobile ? (
          insightSentences.map((sentence, index) => (
            <Typography key={index} component='p' textAlign='justify' sx={{ '&:not(:first-child)': { mt: 2 } }}>
              {sentence}
            </Typography>
          ))
        ) : (
          <Typography textAlign='justify'>{insightText}</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
