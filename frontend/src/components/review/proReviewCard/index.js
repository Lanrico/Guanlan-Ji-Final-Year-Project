import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red, yellow } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { dateTimeFormatter } from '../../../util';
import { Rating } from '@mui/material';
import { display } from '@mui/system';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../../../firebase';
import LikeDislikeBlock from '../../likeDislikeBlock';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProReviewCard = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [avatarUrl, setAvartarUrl] = React.useState('');
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.review.uid.name}
        subheader={
          <React.Fragment>
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
      <CardContent>
        <Typography variant="body2">
          {props.review.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikeDislikeBlock likeNumber={props.review.like} disLikeNumber={props.review.dislike} likeOrNot={""} />
        {/* <IconButton aria-label="thumb up">
          <ThumbUpOffAltIcon />
        </IconButton>
        <Typography mr={1} color={'gray'} variant="body2">{props.review.like}</Typography>
        <IconButton aria-label="thumb down">
          <ThumbDownOffAltIcon />
        </IconButton>
        <Typography color={'gray'} variant="body2">{props.review.dislike}</Typography> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Reviews:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  )
}

export default ProReviewCard;