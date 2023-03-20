import React from "react";
import List from '@mui/material/List';
import StarsIcon from '@mui/icons-material/Stars';
import HpRankListItem from "../hpRankListItem";
import { useQuery } from "react-query";
import movieService from "../../api/movieService";
import Spinner from "../spinner";
const HpRankList = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    ["topMovieRanking", { pageSize: 10, page: props.page, filter: {} }], movieService.getFilteredTopRated
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  const medias = data.data.content;
  return (
    <List
      aria-label="contacts"
    >
      <HpRankListItem media={medias[0]}>
        <StarsIcon color="secondary" />
      </HpRankListItem>
      <HpRankListItem media={medias[1]}>
        <StarsIcon color="primary" />
      </HpRankListItem>
      <HpRankListItem media={medias[2]}>
        <StarsIcon />
      </HpRankListItem>
      <HpRankListItem media={medias[3]} />
      <HpRankListItem media={medias[4]} />
      <HpRankListItem media={medias[5]} />
      <HpRankListItem media={medias[6]} />
      <HpRankListItem media={medias[7]} />
      <HpRankListItem media={medias[8]} />
      <HpRankListItem media={medias[9]} />
    </List>
  );
};

export default HpRankList;