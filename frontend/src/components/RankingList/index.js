import * as React from 'react';
import List from '@mui/material/List';
import TopRatedMovies from '../../sampleData/topRatedMovie';
import RankingListItem from '../RankingListItem';
import { Button, Pagination, PaginationItem } from '@mui/material';
import { useQuery } from 'react-query';
import movieService from '../../api/movieService';
import Spinner from '../spinner';
import { useParams } from 'react-router-dom';
import { filterStringDecoder } from '../../util';
import { Link } from "react-router-dom"

export default function RankingList(props) {
  var rank = 1;
  const page = parseInt(props.page)
  const filterString = useParams().filter
  const filter = filterString === undefined ? 1 : 2;
  console.log(filterString)
  const { data, error, isLoading, isError } = useQuery(
    ["topMovieRanking", { pageSize: 20, page: props.page - 1, filter: filterStringDecoder(filterString) }], movieService.getFilteredTopRated
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  const medias = data.data.content;
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          medias.map((m) =>
            <RankingListItem media={m} rank={rank++} />
          )
        }
      </List>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={10} page={page} color={'primary'}
          renderItem={(item) => (
            <PaginationItem component={Link} to={`/ranking/movie/${item.page}`} {...item} />
          )}
        />
      </div>
    </>
  );
}