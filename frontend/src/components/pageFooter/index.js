import React from "react";
import { styled, alpha, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CompanyLogo from '../../images/CompanyLogo.svg';
import SetuLogo from '../../images/SetuLogo.svg';
import { Avatar, Button, ButtonGroup, Grid } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import MenuButton from "../menuButton";

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