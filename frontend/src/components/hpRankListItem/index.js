import React from "react";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarsIcon from '@mui/icons-material/Stars';
import { ListItem, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

const HpRankListItem = ({ title, link, children }) => {
  return (
    <ListItem disablePadding>
      <Link to={`/medias/movie/602211`} style={{textDecoration: 'none', color: 'black'}}>
        <ListItemButton>
          <ListItemIcon style={{ minWidth: 40 }}>
            {children}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default HpRankListItem;