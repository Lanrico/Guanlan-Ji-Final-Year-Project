import React from "react";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarsIcon from '@mui/icons-material/Stars';
import { ListItem, ListItemButton } from "@mui/material";
const HpRankListItem = ({ title, link, children }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon style={{minWidth:40}}>
          {children}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

export default HpRankListItem;