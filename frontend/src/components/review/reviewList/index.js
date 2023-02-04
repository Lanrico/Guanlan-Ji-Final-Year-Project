import * as React from 'react';
import { Grid } from '@mui/material';
import ProReviewCard from '../proReviewCard';
import ReviewCard from '../reviewCard';


const ReviewList = (props) => {

  let reviewList;

  if (props.list) {
    reviewList = props.list.map((m) => (
      <Grid key={m.author} item xs={12}>
        <ReviewCard review={m}></ReviewCard>
      </Grid>
    ));
  }
  return reviewList;
}

export default ReviewList;