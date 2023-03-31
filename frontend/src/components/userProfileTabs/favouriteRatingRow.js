import { Grid, Rating, Typography } from "@mui/material";
import reviewService from "../../api/reviewService";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { yellow } from "@mui/material/colors";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const FavouriteRatingRow = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    ["fmovieReview", { id: props.media }], reviewService.getReviewsByMediaAndUser
  )
  if (isLoading) {
    return null
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  console.log(data)

  const review = data.data;
  return (
    <Grid sx={{ display: "flex" }}>
      <Typography >
        My rating:
      </Typography>
      <Typography color={yellow[800]} fontSize={"small"}>{review.rate}</Typography>
      <Rating value={review.rate / 2} precision={0.1} readOnly size="small" />
      {
        review.isRecommend ? (
          <ThumbUpAltIcon fontSize="small" color="primary" />
        ) : (
          <ThumbDownAltIcon fontSize="small" color="error" />
        )
      }
    </Grid>
  )
}

export default FavouriteRatingRow;