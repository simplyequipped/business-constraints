import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2'; 
import ChatGptQuery from './ChatGptQuery';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ConstraintComponent() {
    const insightPlaceHolder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.';
    
    return (
      <>
        <ConstraintCard constraintTitle='Maximum Gross Sales' constraintValue='$42,123' insightValue={insightPlaceHolder} />
        <ConstraintCard constraintTitle='Average Ticket Sales' constraintValue='$234' insightValue={insightPlaceHolder} />
        <ConstraintCard constraintTitle='Churn Rate' constraintValue='37%' insightValue={insightPlaceHolder} />
        <ConstraintCard constraintTitle='Maximum Customers' constraintValue='317' insightValue={insightPlaceHolder} />
        <ConstraintCard constraintTitle='Lifetime Value per Customer' constraintValue='$673' insightValue={insightPlaceHolder} />
      </>
    );
  }

function ConstraintCard({ constraintTitle, constraintValue, insightValue }) {
  const systemMessage = `For the purpose of this conversation, business constraints means only these:
                        maximum gross sales, average ticket sales, churn rate, maximum number of customers,
                        customer lifetime value. Target audience is the average small business owner.`
  const userMessage =   `In 2-3 sentences, tell me about the ` + constraintTitle + ` business constraint.`;
  const aiInsight = ChatGptQuery({systemMessage, userMessage});

  console.log(aiInsight);

  return (
    <Card elevation={3} sx={{margin: '10px auto'}}>
      <CardContent width='100%'>
        <Grid container>
          <Grid item width={{xs: '100%', md: '50%'}} mb={{xs: 1, md: 0}}>
            <Typography variant='h6'>{constraintTitle}</Typography>
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
      
      <ConstraintInsight>{aiInsight}</ConstraintInsight>
    </Card>
  );
}

function ConstraintInsight( {children} ) {
  return (
    <Accordion>
    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
      <Typography component='span' color='text.secondary'>Insights</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {children}
      </Typography>
    </AccordionDetails>
  </Accordion>
  );
}
