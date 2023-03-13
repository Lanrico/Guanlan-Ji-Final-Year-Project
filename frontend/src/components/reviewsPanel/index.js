import { Grid } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import reviewService from "../../api/reviewService";
import ProReviewBar from "../review/proReviewBar";
import ReviewList from "../review/reviewList";
import Spinner from "../spinner";
import WriteReviewPanel from "../writeReviewPanel";

const ReviewPanel = (props) => {


  return (
    <>
      <Grid container spacing={2} mb={1}>
        <ProReviewBar></ProReviewBar>
      </Grid>
      <ReviewList>
      </ReviewList>
      <WriteReviewPanel>

      </WriteReviewPanel>
    </>
  )
}

export default ReviewPanel;