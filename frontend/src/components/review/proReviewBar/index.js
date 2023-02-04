import * as React from 'react';
import { Grid } from '@mui/material';
import ProReviewCard from '../proReviewCard';


const ProReviewBar = (props) => {

  let proReviewCards;

  proReviewCards = props.list.map((m) => (
    <Grid key={m.author} item xs={6}>
      <ProReviewCard review={m}></ProReviewCard>
    </Grid>
  ));
  return proReviewCards;
}

export default ProReviewBar;