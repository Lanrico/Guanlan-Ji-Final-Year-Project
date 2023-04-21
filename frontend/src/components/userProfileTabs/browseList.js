import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../spinner';
import { Grid, TablePagination } from '@mui/material';
import { useLocation } from 'react-router-dom';
import historyService from '../../api/historyService';
import BrowseListItem from './browseListItem';

const BrowseList = (props) => {
  const [page, setPage] = useState(0);
  const location = useLocation();
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { data, error, isLoading, isError } = useQuery(
    ["BrowseHistoryByPage", { user: props.user, pageSize: rowsPerPage, page: page }, location.pathname], historyService.getAllByUser
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return null
  }

  return (
    <>
      <Grid container spacing={1}>
        {data.data.content.map((history) => {
          return (
            <Grid item xs={12} md={12} lg={6}>
              <BrowseListItem media_id={history.id.mid} time={history.time} />
            </Grid>
          )
        })}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
        {/* <Pagination count={data.data.totalPages} page={page} color={'primary'} onChange={(e, value) => setPage(value)} /> */}
        <TablePagination
          component="div"
          count={data.data.totalElements}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Media per page:"
          rowsPerPageOptions={[2, 4, 6, 8, 10]}
        />
      </div>
    </>
  )
}

export default BrowseList;