import * as React from 'react';
import { Grid, Stack } from '@mui/material';
import ProReviewCard from '../proReviewCard';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Spinner from '../../spinner';
import reviewService from '../../../api/reviewService';


const ProReviewBar = (props) => {
  const [reviewPage, setReviewPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState("rate");

  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(
    ["movieReview/" + id, { media: id, pageSize: 20, page: reviewPage, orderBy: orderBy, type: 1 }], reviewService.getReviewsByMedia
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  const reviews = data.data.content;

  return (
    <Grid container m={3} spacing={2} xs={12} style={{ width: '100%', overflowX: 'auto' }} >
      <Stack direction='row' >
        {reviews.map((r) => (
          <Grid item key={r.id} xs={6} m={1} style={{ minWidth: 323 }}>
            <ProReviewCard review={r}></ProReviewCard>
          </Grid>
        ))}
      </Stack>
    </Grid>
  )
    ;
}

export default ProReviewBar;