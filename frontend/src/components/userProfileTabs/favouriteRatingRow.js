import { Grid, Rating, Typography } from "@mui/material";
import reviewService from "../../api/reviewService";
import { useQuery } from "react-query";
import { yellow } from "@mui/material/colors";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useParams } from "react-router-dom";

const FavouriteRatingRow = (props) => {
  const { user_id } = useParams();
  const { data, error, isLoading, isError } = useQuery(
    ["fmovieReview", { media: props.media.id, user: user_id }], reviewService.getReviewsByMediaAndUser
  )
  if (isLoading) {
    return <Typography variant="body2" textAlign={"center"} noWrap>
      Not rated yet
    </Typography>
  }
  if (isError) {
    return <Typography variant="body2" textAlign={"center"} noWrap>
      Not rated yet
    </Typography>
  }

  console.log(data)

  const review = data.data;
  return (
    <Grid>
      <Typography variant="body2" textAlign={"center"} noWrap>
        My rating:
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
        {
          review.isRecommend ? (
            <ThumbUpAltIcon fontSize="small" color="primary" />
          ) : (
            <ThumbDownAltIcon fontSize="small" color="error" />
          )
        }
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography color={yellow[800]} pr={1}>{review.rate}</Typography>
          <Rating value={review.rate / 2} precision={0.1} readOnly size="small" />
        </div>
      </div>
    </Grid >
  )
}

export default FavouriteRatingRow;