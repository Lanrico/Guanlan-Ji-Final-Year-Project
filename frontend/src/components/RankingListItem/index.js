import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import React from "react"

const RankingListItem = (props) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar sx={{ marginRight: 1 }}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${props.media.poster_path}`}
            alt={props.media.title}
            loading="lazy"
            width={100}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <div style={{ display: "flex" }}>
                <Typography mr={1}> {props.media.title}</Typography>
                {
                  props.media.original_title && props.media.original_language !== "en" ? (
                    <Typography color="text.secondary">{props.media.original_title}</Typography>
                  ) : (
                    null
                  )
                }

              </div>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullwidth" component="li" />
    </>
  )
}

export default RankingListItem;