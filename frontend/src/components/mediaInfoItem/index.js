import { ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

const MediaInfoItem = (props) => {
  console.log(props)
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary=
        {
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              {props.itemName}
             </Typography>
           </React.Fragment>
         }
        secondary=
        {
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {props.value}
             </Typography>
           </React.Fragment>
         }
      />
    </ListItem>
  )
}

export default MediaInfoItem;