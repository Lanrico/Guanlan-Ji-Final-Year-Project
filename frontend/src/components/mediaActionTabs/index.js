import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import ReviewPanel from '../reviewsPanel';
import { AuthContext } from '../../context/authContext';
import { useTheme } from '@emotion/react';


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
        <Box sx={{ py: 3 }} >
          <TabPanel value="1" style={{ padding: "0" }}>
            <ReviewPanel />
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
