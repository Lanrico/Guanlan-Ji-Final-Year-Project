import { ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

const MediaInfoItem = (props) => {

  return (
    <ListItem alignItems="flex-start" sx={{padding: "0px 0px"}}>
      <ListItemText
        primary=
        {
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="caption"
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
              variant="body1"
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