import * as React from 'react';
import List from '@mui/material/List';
import TopRatedMovies from '../../sampleData/topRatedMovie';
import RankingListItem from '../RankingListItem';
import { Pagination, TablePagination } from '@mui/material';

export default function RankingList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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