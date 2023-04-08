import React from 'react';
import Typography from '@mui/material/Typography';
import BrowseList from './browseList';
import { useParams } from 'react-router-dom';
import ReviewHistoryList from './reviewHistoryList';
import FavouriteHistoryList from './favouriteHistoryList';

const History = (props) => {
  const { user_id } = useParams();

  return (
    <>
      <Typography variant="h6" sx={{ color: "grey", paddingLeft: 2 }}>
        Browse History
      </Typography>
      <BrowseList user={user_id}></BrowseList>
      <Typography variant="h6" sx={{ color: "grey", paddingLeft: 2 }}>
        Other History
      </Typography>
      <ReviewHistoryList user={user_id} />
      <FavouriteHistoryList user={user_id} />
    </>
  )
}

export default History;