import * as React from 'react';
import { Button, Grid, IconButton, Pagination, PaginationItem, Typography } from '@mui/material';
import ReviewCard from '../reviewCard';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import reviewService from '../../../api/reviewService';
import Spinner from '../../spinner';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const checkToString = (checked) => {
  return checked ? "time" : "like"
}

const ReviewList = (props) => {
  const [reviewPage, setReviewPage] = React.useState(1);
  const [checked, setChecked] = React.useState(false);
  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };
  const handleChange = (event, value) => {
    setReviewPage(value);
  };
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(
    ["movieReview/" + id, { media: id, pageSize: 5, page: reviewPage - 1, orderBy: checkToString(checked), type: 0 }], reviewService.getReviewsByMedia
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  console.log(data.data)
  const reviews = data.data.content;

  return (
    <>
      <div style={{ display: 'flex', alignItems: "center" }}>
        <Typography>Order by {checkToString(checked)}</Typography>
        <IconButton color="primary" onClick={toggleChecked}>
          {checked ? <CalendarMonthIcon /> : <ThumbUpOffAltIcon />}
        </IconButton>
      </div>
      {reviews.map((r) => (
        <Grid key={r.id} item xs={12}>
          <ReviewCard review={r}></ReviewCard>
        </Grid>
      ))}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={data.data.totalPages} onChange={handleChange} page={reviewPage} color={'primary'}
          renderItem={(item) => (
            <PaginationItem component={Button} {...item} />
          )}
        />
      </div>
    </>
  );
}

export default ReviewList;