import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { dateTimeFormatter } from "../../../util";
import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import proUserRequestService from "../../../api/proUserRequestService";

const RequestItem = (props) => {

  useEffect(() => {
    getDownloadURL(ref(storage, 'identifications/' + props.request.uid.id + '.pdf'))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
          console.log(blob)
        };
        xhr.open('GET', url);
        xhr.send();
        console.log(url)
        setFileUrl(url)
        // download file from url

      })
      .catch((error) => {
        // Handle any errors
      });
  }, [])
  const authContext = useContext(AuthContext);
  const [avatarUrl, setAvartarUrl] = React.useState('');
  console.log(props.request)
  const storageRef = ref(storage, 'avatars/' + props.request.uid.id + ".jpg")
  const [isHandled, setIsHandled] = React.useState(false)
  getDownloadURL(storageRef).then((url) => {
    setAvartarUrl(url)
  }).catch((error) => {
    console.error(error);
  });
  const [fileUrl, setFileUrl] = React.useState('');


  const handleAcceptRequest = () => {
    proUserRequestService.updateStatus(true, authContext.userProfile.id, props.request.id).then((res) => {
      console.log("accept request")
      setIsHandled(true)
    })
  }

  const handleRejectReport = () => {
    proUserRequestService.updateStatus(false, authContext.userProfile.id, props.request.id).then((res) => {
      console.log("reject request")
      setIsHandled(true)
    })
  }

  return (
    <div style={{ display: isHandled ? "none" : "block" }}>
      <ListItem alignItems="center" >
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem sx={{ paddingLeft: 1 }} alignItems="flex-start">
            <ListItemAvatar style={{ marginRight: 2 }}>
              <Avatar sx={{ width: 50, height: 50 }} alt="Remy Sharp" src={avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography>{props.request.uid.name}</Typography>
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
                      Company: {props.request.company}
                    </Typography>
                    <br></br>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="subtitle"
                      color="text.primary"
                    >
                      Job: {props.request.job}
                    </Typography>
                    <br></br>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="subtitle"
                      color="text.primary"
                    >
                      Description: {props.request.description}
                    </Typography>
                    <br></br>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="subtitle"
                      color="text.primary"
                    >
                      Identification: <a href={fileUrl} target="_blank">Download the identification</a>
                    </Typography>

                    {/* <Button onClick={handleDownload}>Download the identification</Button> */}
                  </div>
                  <br></br>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {dateTimeFormatter(props.request.time)}
                    <Button onClick={handleAcceptRequest} size="small">Accept the request</Button>
                    <Button onClick={handleRejectReport} size="small" color="secondary">Reject the request</Button>

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
export default RequestItem;