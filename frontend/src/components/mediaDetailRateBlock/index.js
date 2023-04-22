import { Avatar, Box, Divider, Grid, Link, Paper, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Doughnut } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useQuery } from "react-query";
import movieService from "../../api/movieService";
import Spinner from "../spinner";
import { useEffect, useState } from "react";
import reviewService from "../../api/reviewService";

const MediaDetailRateBlock = (props) => {
  const [recommend, setRecommend] = useState(0);
  const [unrecommend, setUnrecommend] = useState(0);
  useEffect(() => {
    reviewService.getAllReviewsByMedia(props.media.id).then((res) => {
      console.log(res.data)
      setRecommend(res.data.filter((r) => r.isRecommend).length);
      setUnrecommend(res.data.filter((r) => !r.isRecommend).length);
    })
  }, [])

  const { data, error, isLoading, isError } = useQuery(
    ["MovieRank", { id: props.media.id }], movieService.getRank
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  console.log(props.media)
  const rank = data.data;
  const scoreConverter = (score) => {
    return Math.ceil(score) / 2;
  }

  const labels = {
    0.5: 'Terrible',
    1: 'Terrible+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Average',
    3: 'Average+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  Chart.overrides['doughnut'].plugins.legend.display = false;
  const data1 = {
    datasets: [
      {
        data: [recommend, unrecommend],
        backgroundColor: [green[500], red[500]],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Like', 'Unlike']
  };

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    tooltip: {

    }
  };

  const recommendRate = [
    {
      title: 'Good',
      value: recommend + unrecommend > 0 ? (recommend * 100 / (recommend + unrecommend)).toFixed(0) : 0,
      icon: ThumbUpOffAltIcon,
      color: green[500]
    },
    {
      title: 'Bad',
      value: recommend + unrecommend > 0 ? (unrecommend * 100 / (recommend + unrecommend)).toFixed(0) : 0,
      icon: ThumbDownOffAltIcon,
      color: red[500]
    }
  ];


  return (
    <Paper sx={{ height: "250px", padding: "10%" }} >
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ bgcolor: green[500], width: 50, height: 50 }}>{props.media.finalRate.toFixed(1)}</Avatar>
        <Grid>
          <Typography variant={"h5"} sx={{ padding: "10px 0 0 10px" }}>{labels[scoreConverter(props.media.finalRate + 0.001)]}</Typography>
        </Grid>
      </Grid>
      <Grid pt={1}>
        <Typography
          align="right"
          fontSize={1}
          color="text.secondary">
          ILI movie ranked:<Link underline="none" href="">#{rank}</Link>
        </Typography>
        <Typography
          align="right"
          fontSize={1}
          color="text.secondary">
          Voted by {props.media.finalVoteCount} users
        </Typography>
      </Grid>
      <Divider></Divider>
      <Grid>

        <Box
          sx={{
            height: 90,
            position: 'relative',
            pt: 1.5
          }}
        >
          <Doughnut
            data={data1}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {recommendRate.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                pt: 0,
                pr: 1.5,
                pl: 1.5,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                style={{ color }}
                variant="h6"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Paper>
  )
}

export default MediaDetailRateBlock;