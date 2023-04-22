import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { dateTimeFormatter } from '../../../util';
import { Rating } from '@mui/material';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../../../firebase';
import LikeDislikeBlock from '../../likeDislikeBlock';
import ReportReviewButton from '../reportReviewButton';
import { AuthContext } from '../../../context/authContext';
import { useQuery } from 'react-query';
import proUserRequestService from '../../../api/proUserRequestService';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const ProReviewCard = (props) => {
  const authContext = React.useContext(AuthContext);
  const [avatarUrl, setAvartarUrl] = React.useState('');

  const { data, error, isLoading, isError } = useQuery(
    ["proRequest", { userId: props.review.uid.id }],
    proUserRequestService.getById
  )

  if (isLoading) {
    return null
  }
  if (isError) {
    console.log("error")
    return <h6>{error.message}</h6>
  }

  const proUserRequest = data.data;

  const storageRef = ref(storage, 'avatars/' + props.review.uid.id + ".jpg")
  getDownloadURL(storageRef).then((url) => {
    setAvartarUrl(url)
  }).catch((error) => {
    console.error(error);
  });
  console.log(props.review.isRecommend)
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={avatarUrl} sx={{ width: 56, height: 56 }} aria-label="recipe">
            {/* {props.review.uid.name.split([''])[0]} */}
          </Avatar>
        }
        action={
          authContext.isAuthenticated ? <ReportReviewButton review={props.review} /> : null
        }
        title={
          <React.Fragment>
            <div style={{ display: "flex" }}>
              {props.review.uid.name}
            </div>
          </React.Fragment>}
        subheader={
          <React.Fragment>
            <div style={{ display: "flex" }}>
              <CheckCircleOutlineRoundedIcon style={{ marginRight: 2 }} fontSize='small' color='secondary' />
              {proUserRequest.job + " of " + proUserRequest.company}
            </div>
            {dateTimeFormatter(props.review.time)}
            <br></br>
            <div style={{ display: "flex" }}>
              <Rating value={props.review.rate / 2} precision={0.1} readOnly size="small" />
              <Typography mr={2} color={yellow[800]} fontSize={"small"} ml={1}>
                {props.review.rate}
              </Typography>
              {props.review.isRecommend ? (
                <ThumbUpAltIcon fontSize="small" color="primary" />
              ) : (
                <ThumbDownAltIcon fontSize="small" color="error" />
              )}
            </div>
          </React.Fragment>}
      />
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography variant="body2">
          {props.review.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikeDislikeBlock likeNumber={props.review.like} disLikeNumber={props.review.dislike} likeOrNot={""} />
      </CardActions>
    </Card>
  )
}

export default ProReviewCard;