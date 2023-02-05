import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TopRatedMovies from '../../sampleData/topRatedMovie';
import RankingListItem from '../RankingListItem';

export default function RankingList() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        TopRatedMovies.results.map((m) =>
          <RankingListItem media={m} />
        )
      }
    </List>
  );
}