import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from 'react-query';

import Spinner from '../spinner';
import Poster from '../../images/WebsiteLogo300-removebg.png';
import LoginBlock from "../loginBlock";
import PageTemplate from "../pageTemplate";
import MediasBar from "../mediasBar";
import MediaDataService from "../../services/mediaService";

const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    "medias", MediaDataService.getAll
  )
  if (isLoading) {
    return <Spinner />
  }
  console.log(data)
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const medias = data.data;
  console.log(medias)
  return (
    <PageTemplate>
      <Card sx={{ display: 'flex', height: 330 }} elevation={1}>
        <CardMedia
          component="img"
          sx={{ width: "70%" }}
          image={Poster}
          alt="Poster"
        />
        {/* To be fixed: Change Image background color to fit the website */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <LoginBlock />
        </Box>
      </Card>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={9}>
          <Typography variant={"h4"}>What's popular</Typography>
          <MediasBar mb={3} medias={medias}>
            <Box mb={0.5} container width={"98%"} style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
              <Link href="">Game</Link>
              <Link href="">more</Link>
            </Box>
          </MediasBar>
          <MediasBar mb={3} medias={medias}>
            <Box mb={0.5} container width={"98%"} style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
              <Link href="">Movie</Link>
              <Link href="">more</Link>
            </Box>
          </MediasBar>
          <MediasBar mb={2} medias={medias}>
            <Box mb={0.5} container width={"98%"} style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
              <Link href="">Music</Link>
              <Link href="">more</Link>
            </Box>
          </MediasBar>
        </Grid>
        <Grid item xs>

        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default HomePage;