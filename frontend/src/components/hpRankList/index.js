import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarsIcon from '@mui/icons-material/Stars';
import HpRankListItem from "../hpRankListItem";
const HpRankList = ({ mediasRankingList }) => {
  return (
    <List
      aria-label="contacts"
    >
      <HpRankListItem  title="The Shawshank Redemption">
        <StarsIcon color="secondary" />
      </HpRankListItem>
      <HpRankListItem title="The Godfather">
        <StarsIcon color="primary" />
      </HpRankListItem>
      <HpRankListItem title="The Dark Knight">
        <StarsIcon />
      </HpRankListItem>
      <HpRankListItem title="The Godfather Part II" />
      <HpRankListItem title="12 Angry Men" />
      <HpRankListItem title="Schindler's List" />
      <HpRankListItem title="The Lord of the Rings" />
      <HpRankListItem title="Pulp Fiction" />
      <HpRankListItem title="The Lord of the Rings" />
      <HpRankListItem title="The Good, the Bad and the Ugly" />
    </List>
  );
};

export default HpRankList;