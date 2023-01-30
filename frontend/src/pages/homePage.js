import { Grid, Link, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from 'react-query';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Spinner from '../components/spinner';
import Poster from '../images/WebsiteLogo300-removebg.png';
import LoginBlock from "../components/loginBlock";
import PageTemplate from "../components/pageTemplate";
import MediasBar from "../components/mediasBar";
import MediaDataService from "../services/mediaService";
import HpRankList from "../components/hpRankList";
import movies from "../sampleData/movies";
const HomePage = (props) => {
  const [value, setValue] = useState('1');
  const theme = useTheme();
  // const { data, error, isLoading, isError } = useQuery(
  //   "medias", MediaDataService.getAll
  // )
  // if (isLoading) {
  //   return <Spinner />
  // }
  // if (isError) {
  //   return <h1>{error.message}</h1>
  // }
  // const medias = data.data;
  const medias = movies.slice(0, 4);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Grid item xs={8} borderRight={1} borderColor={theme.palette.primary.main}>
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
        <Typography variant={"h6"}>The Top 10 in</Typography>
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                  <Tab label="Game" value="1" />
                  <Tab label="Movie" value="2" />
                  <Tab label="Music" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1" style={{padding: "0"}}>
                <HpRankList />
              </TabPanel>
              <TabPanel value="2" style={{padding: "0"}}>
                <HpRankList />
              </TabPanel>
              <TabPanel value="3" style={{padding: "0"}}>
                <HpRankList />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default HomePage;