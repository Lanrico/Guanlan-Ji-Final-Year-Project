import { Grid, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useQuery } from "react-query";

import Poster from '../images/WebsiteLogo300-removebg.png';
import LoginBlock from "../components/loginBlock";
import PageTemplate from "../components/pageTemplate";
import MediasBar from "../components/mediasBar";
import HpRankList from "../components/hpRankList";
import movieService from "../api/movieService";
import Spinner from "../components/spinner";

import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
const HomePage = (props) => {
  const authContext = useContext(AuthContext);
  const [value, setValue] = useState('1');
  const theme = useTheme();
  const { data, error, isLoading, isError } = useQuery(
    ["trendingMovie4", { pageSize: 12, page: 0 }], movieService.getTopTrending
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  const medias = data.data.content;
  const medias1 = medias.slice(0, 4)
  const medias2 = medias.slice(4, 8)
  const medias3 = medias.slice(8, 12)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PageTemplate>
      {/* <Button fullWidth onClick={handleSubmitButton1} >context checker</Button> */}

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
          <MediasBar mb={3} medias={medias1}>
            <Box mb={0.5} container width={"98%"} style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
              <Link to="" style={{ color: theme.palette.primary.main }}>Game</Link>
              <Link to="" style={{ color: theme.palette.primary.main }}>more</Link>
            </Box>
          </MediasBar>
          <MediasBar mb={3} medias={medias2}>
            <Box mb={0.5} container width={"98%"} style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
              <Link to="/ranking/movie/1" style={{ color: theme.palette.primary.main }}>Movie</Link>
              <Link to="/ranking/Movie/1/sort=popularity&order=desc&genres=&releasedate=to&language=&rate=0to10&runtime=0to400" style={{ color: theme.palette.primary.main }}>more</Link>
            </Box>
          </MediasBar>
          <MediasBar mb={2} medias={medias3}>
            <Box mb={0.5} container width={"98%"} style={{ flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
              <Link to="" style={{ color: theme.palette.primary.main }}>Music</Link>
              <Link to="" style={{ color: theme.palette.primary.main }}>more</Link>
            </Box>
          </MediasBar>
        </Grid>
        <Grid item xs>
          <Grid container>
            {
              authContext.isAuthenticated ? (
                <>
                  <ImageSlider />
                </>
              ) : (
                null
              )
            }

            <Typography variant={"h6"}>The Top 10 in</Typography>
            <Box>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                    <Tab label="Movie" value="1" />
                    <Tab label="Game" value="2" />
                    <Tab label="Music" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1" style={{ padding: "0" }}>
                  <HpRankList page={0} />
                </TabPanel>
                <TabPanel value="2" style={{ padding: "0" }}>
                  <HpRankList page={1} />
                </TabPanel>
                <TabPanel value="3" style={{ padding: "0" }}>
                  <HpRankList page={2} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default HomePage;