import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import ProReviewBar from "../review/proReviewBar";
import ReviewList from "../review/reviewList";
import WriteReviewPanel from "../writeReviewPanel";

const ReviewPanel = (props) => {

  const authContext = React.useContext(AuthContext);
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2} mb={1}>
        <ProReviewBar></ProReviewBar>
      </Grid>
      <ReviewList>
      </ReviewList>
      {authContext.isAuthenticated ? <WriteReviewPanel /> : <Link to={"/login"} style={{ textDecoration: "none", color: theme.palette.primary.main }}>Login to send your review</Link>}
    </>
  )
}

export default ReviewPanel;