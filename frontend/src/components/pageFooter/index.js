import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SetuLogo from '../../images/SetuLogo.svg';
import { Grid } from "@mui/material";

const PageFooter = (props) => {
  return (
    <Grid container mt={1} spacing={1} sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="primary">
        <Toolbar>
          <img src={SetuLogo} height="50px" alt=""></img>
          <Box sx={{ flexGrow: 1 }} />
          <Typography color="white">
            This website is Guanlan Ji's Final Year Project.
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

export default PageFooter;