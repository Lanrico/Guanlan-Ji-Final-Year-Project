import * as React from 'react';
import { Divider } from '@mui/material';
import CastCard from '../castCard'
import movieCast from '../../../sampleData/movieCast';
import { Stack } from '@mui/system';

const CastBar = (props) => {
  const director_info = movieCast.crew.filter((m) => m.job === 'Director');
  return (
    <Stack pt={2} direction="row" style={{ maxWidth: '100%', overflow: 'auto' }}>
      <CastCard job="director" person={director_info[0]} />
      <Divider orientation="vertical" flexItem />
      {
        movieCast.cast.map((m) =>
          <CastCard job="cast" person={m} />
        )
      }
    </Stack>
  )
}

export default CastBar;