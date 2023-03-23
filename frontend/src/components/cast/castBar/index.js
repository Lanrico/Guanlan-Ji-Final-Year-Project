import * as React from 'react';
import { Divider } from '@mui/material';
import CastCard from '../castCard'
import { Stack } from '@mui/system';
import { useQuery } from 'react-query';
import { getMoviePeople } from '../../../api/tmdb-api';
import Spinner from '../../spinner';

const CastBar = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    ["MovieCasts", { id: props.media.movie.tmdbId }], getMoviePeople
  )

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movieCast = data.cast;
  const movieCrew = data.crew;

  const director_info = movieCrew.filter((m) => m.job === 'Director');

  console.log(props.media.id)


  return (
    <Stack pt={2} direction="row" style={{ maxWidth: '100%', overflow: 'auto' }}>
      <CastCard job="director" person={director_info[0]} />
      <Divider orientation="vertical" flexItem />
      {
        movieCast.map((m) =>
          <CastCard job="cast" person={m} />
        )
      }
    </Stack>
  )
}

export default CastBar;