import * as React from 'react';
import List from '@mui/material/List';
import TopRatedMovies from '../../sampleData/topRatedMovie';
import RankingListItem from '../RankingListItem';
import { Pagination } from '@mui/material';

export default function RankingList() {
  var rank = 1;
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          TopRatedMovies.results.map((m) =>
            <RankingListItem media={m} rank={rank++} />
          )
        }
      </List>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={10} color="primary" />
      </div>
    </>
  );
}