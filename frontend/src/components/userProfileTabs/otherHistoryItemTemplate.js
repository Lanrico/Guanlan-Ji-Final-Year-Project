import { Avatar, ListItem, ListItemAvatar, ListItemText, Rating, Typography } from "@mui/material";
import React, { useContext } from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { dateTimeFormatter } from "../../util";
import { yellow } from "@mui/material/colors";

const OtherHistoryItemTemplate = (props) => {
  const theme = useTheme();

  // get the avatar image from the user's profile
  const authContext = useContext(AuthContext)
  const avatarSize = 45;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={authContext.userProfile.name}
          src={authContext.userAvatar}
          sx={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {props.type === "review" ? `Reviewed and ranked: ` : "Added to favourites: "}
            <Link to={`/medias/movie/${props.item.mid.id}`} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
              {props.item.mid.movie.title}
            </Link>
          </React.Fragment>}
        secondary={
          props.type === "review" ?
            <React.Fragment>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" noWrap mr={1} >
                    by
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography color={yellow[800]}>{props.item.rate}</Typography>
                      <Rating value={props.item.rate / 2} precision={0.1} readOnly size="small" sx={{ marginRight: 1 }} />
                    </div>
                    {
                      props.item.isRecommend ? (
                        <ThumbUpAltIcon fontSize="small" color="primary" />
                      ) : (
                        <ThumbDownAltIcon fontSize="small" color="error" />
                      )
                    }
                  </div>
                </div>
                <Typography variant="body2" noWrap mt={"4px"} sx={{ textAlign: "right" }}>
                  at {dateTimeFormatter(props.item.time)}
                </Typography>
              </div>
            </React.Fragment>
            :
            <React.Fragment>
              <Typography variant="body2" noWrap >
                at {dateTimeFormatter(props.item.time)}
              </Typography>
            </React.Fragment>
        }
      />

    </ListItem>
  )
}

export default OtherHistoryItemTemplate;