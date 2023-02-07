import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Grid from "@mui/material/Grid";

import ProReviewBar from '../review/proReviewBar'
import ReviewList from '../review/reviewList';

const sampleProReview = [
  {
    author: "IGN",
    content: "A brand-new, beautiful poster of The Super Mario Bros. Movie has been released and it features all of our favorite Mushroom Kingdom characters, including Mario, Luigi, Princess Peach, Donkey Kong, Bowser, and Toad.",
    date: "2021-12-31"
  },
  {
    author: "KAMI",
    content: "In a cinematic universe where half of all living beings have already died and come back to life, Black Panther: Wakanda Forever reminds us that losing one person can feel just as devastating.",
    date: "2020-3-01"
  }
]

const sampleReview = [
  {
    author: "IGN",
    content: "A brand-new, beautiful poster of The Super Mario Bros. Movie has been released and it features all of our favorite Mushroom Kingdom characters, including Mario, Luigi, Princess Peach, Donkey Kong, Bowser, and Toad.",
    date: "2021-12-31"
  },
  {
    author: "KAMI",
    content: "In a cinematic universe where half of all living beings have already died and come back to life, Black Panther: Wakanda Forever reminds us that losing one person can feel just as devastating.",
    date: "2020-3-01"
  }
]

const StyledTabs = styled((props) =>
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />)
  (({ theme }) => ({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 50,
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  })
  );

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.7)',
    '&.Mui-selected': {
      color: '#000',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

export default function MediaActionTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Reviews" value="1" />
          <StyledTab label="Discussion" value="2" />
        </StyledTabs>
        <Box sx={{ p: 3 }} >
          <TabPanel value="1" style={{ padding: "0" }}>
            <Grid container spacing={2} mb={1}>
              <ProReviewBar list={sampleProReview}></ProReviewBar>
            </Grid>
            <ReviewList list={sampleReview}>
            </ReviewList>
          </TabPanel>
          <TabPanel value="2" style={{ padding: "0" }}>
            456
          </TabPanel>
          <TabPanel value="3" style={{ padding: "0" }}>
            789
          </TabPanel>
        </Box>
      </TabContext >
    </Box >
  );
}
