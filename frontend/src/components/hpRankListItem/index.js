import React from "react";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItem, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

const HpRankListItem = ({ media, children }) => {
  return (
    <ListItem disablePadding>
      <Link to={`/medias/movie/${media.id}`} style={{ textDecoration: 'none', color: 'black', width: '100%' }}>
        <ListItemButton>
          <ListItemIcon style={{ minWidth: 40 }}>
            {children}
          </ListItemIcon>
          <ListItemText primary={media.movie.title} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default HpRankListItem;