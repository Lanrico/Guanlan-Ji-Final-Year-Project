import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../../../firebase';
import { dateTimeFormatter } from '../../../util';
import { yellow } from '@mui/material/colors';
import LikeDislikeBlock from '../../likeDislikeBlock';
import ReportReviewButton from '../reportReviewButton';
import { AuthContext } from '../../../context/authContext';

export default function ReviewCard(props) {
  const authContext = React.useContext(AuthContext);
  const [avatarUrl, setAvartarUrl] = React.useState('');

  const storageRef = ref(storage, 'avatars/' + props.review.uid.id + ".jpg")
  getDownloadURL(storageRef).then((url) => {
    setAvartarUrl(url)
  }).catch((error) => {
    console.error(error);
  });
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem sx={{ paddingLeft: 1 }} alignItems="flex-start">
        <ListItemAvatar style={{ marginRight: 2 }}>
          <Avatar sx={{ width: 50, height: 50 }} alt="Remy Sharp" src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography>{props.review.uid.name}</Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Rating value={props.review.rate / 2} precision={0.1} readOnly size="small" />
                  <Typography mr={2} color={yellow[800]} fontSize={"small"} ml={1}>
                    {props.review.rate}
                  </Typography>
                  {props.review.isRecommend ? (
                    <ThumbUpAltIcon fontSize="small" color="primary" />
                  ) : (
                    <ThumbDownAltIcon fontSize="small" color="error" />
                  )}
                  {authContext.isAuthenticated ? <ReportReviewButton review={props.review} /> : null}
                </div>
              </div>

            </React.Fragment>}
          secondary={
            <React.Fragment>
              <div style={{ marginTop: 5, marginBottom: 5 }}>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="subtitle"
                  color="text.primary"
                >
                  {props.review.content}
                </Typography>
              </div>
              <br></br>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {dateTimeFormatter(props.review.time)}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LikeDislikeBlock likeNumber={props.review.like} disLikeNumber={props.review.dislike} likeOrNot={""} />
                </div>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullwidth" component="li" />
    </List>
  );
}