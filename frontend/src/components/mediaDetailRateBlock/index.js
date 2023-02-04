import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const MediaDetailRateBlock = (props) => {
  const theme = useTheme();
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
  const data = {
    datasets: [
      {
        data: [63, 37],
        backgroundColor: [green[500], red[500]],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Good', 'Bad']
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
      value: 63,
      icon: ThumbUpOffAltIcon,
      color: green[500]
    },
    {
      title: 'Bad',
      value: 37,
      icon: ThumbDownOffAltIcon,
      color: red[500]
    }
  ];


  return (
    <Paper sx={{ height: "250px", padding: "10%" }} >
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ bgcolor: green[500], width: 50, height: 50 }}>{props.media.vote_average.toFixed(1)}</Avatar>
        <Grid>
          <Typography variant={"h5"} sx={{ padding: "10px 0 0 10px" }}>{labels[scoreConverter(props.media.vote_average + 0.001)]}</Typography>
        </Grid>
      </Grid>
      <Grid pt={1}>
        <Typography
          align="right"
          fontSize={1}
          color="text.secondary">
          ILI movie ranked:<Link underline="none" href="">#10</Link>
        </Typography>
        <Typography
          align="right"
          fontSize={1}
          color="text.secondary">
          Voted by {props.media.vote_count} users
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
            data={data}
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
              {/* <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    {title}
                  </Typography> */}
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