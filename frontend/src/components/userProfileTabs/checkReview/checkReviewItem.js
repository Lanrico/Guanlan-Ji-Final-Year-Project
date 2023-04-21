import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import ReviewCard from "../../review/reviewCard"
import { dateTimeFormatter } from "../../../util";
import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import reportService from "../../../api/reportService";

const CheckReviewItem = (props) => {

  const [avatarUrl, setAvartarUrl] = React.useState('');
  console.log(props.report)
  const storageRef = ref(storage, 'avatars/' + props.report.uid.id + ".jpg")
  const [isHandled, setIsHandled] = React.useState(false)
  getDownloadURL(storageRef).then((url) => {
    setAvartarUrl(url)
  }).catch((error) => {
    console.error(error);
  });

  const handleDeleteReview = () => {
    reportService.deleteReview(props.report.uid.id, props.report.rid.id).then((res) => {
      console.log("delete review")
      setIsHandled(true)
    })
  }

  const handleRejectReport = () => {
    reportService.rejectReport(props.report.uid.id, props.report.rid.id).then((res) => {
      console.log("reject report")
      setIsHandled(true)
    })
  }

  return (
    <div style={{ display: isHandled ? "none" : "block" }}>
      <ListItem alignItems="center" >
        <Typography width={100} align="center">Reported Review:</Typography>
        <ReviewCard review={props.report.rid}></ReviewCard>
      </ListItem>
      <ListItem alignItems="center" >
        <Typography width={100} align="center">Reporter and reason:</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem sx={{ paddingLeft: 1 }} alignItems="flex-start">
            <ListItemAvatar style={{ marginRight: 2 }}>
              <Avatar sx={{ width: 50, height: 50 }} alt="Remy Sharp" src={avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography>{props.report.uid.name}</Typography>
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
                      {props.report.reason}
                    </Typography>
                  </div>
                  <br></br>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {dateTimeFormatter(props.report.time)}
                    <Button onClick={handleDeleteReview} size="small" color="secondary">Detele the review</Button>
                    <Button onClick={handleRejectReport} size="small">Reject the report</Button>
                  </div>

                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </ListItem>

      <Divider variant="fullwidth" component="li" />

    </div>
  )
}
export default CheckReviewItem;