import React, { useContext } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SimpleLogo from '../../images/SimpleLogo.png';
import { Avatar, Button, ButtonGroup, Grid, useMediaQuery } from "@mui/material";

import MenuButton from "../menuButton";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import MyButtonMenu from "../myButtonMenu";

const MyButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  // color: theme.palette.grey,
  backgroundColor: alpha(theme.palette.common.white, 0),
  '& :hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const PageHeader = (props) => {
  const authContext = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearchButton = (event) => {
    if (searchText === '') {
    }
    else {
      navigate(`/search/Movie/${searchText}/1`)
    }
  };

  const handleSearchTFChange = (event) => {
    setSearchText(event.target.value)
    console.log(searchText)
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Grid container mb={1} spacing={1} sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
      <AppBar elevation={1} position="static" color="default" sx={{ paddingTop: 1 }} >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Link to={`/homepage`}>
            <img src={SimpleLogo} height={isMobile ? "25px" : "50px"} alt="companylogo"></img>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <MyButtonGroup variant="text" color="inherit" style={{ color: 'grey' }}>
              <MenuButton title="Game" textList={["Ranking", "Recommandation", "History", "Trending", "Genres"]} linkList={["/ranking/game", "", ""]} />
              <MenuButton title="Movie" textList={["Ranking", "Recommandation", "History", "Trending", "Genres"]} linkList={["/ranking/movie/1", "", ""]} />
              <MenuButton title="Music" textList={["Ranking", "Recommandation", "History", "Trending", "Genres"]} linkList={["/ranking/music", "", ""]} />
            </MyButtonGroup>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <IconButton sx={{ marginLeft: 1 }} onClick={handleSearchButton}>
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchTFChange}
            />
          </Search>
          {
            authContext.isAuthenticated ? (
              <>
                <MyButtonMenu items={[
                  { title: "Profile", link: `/user/${authContext.userProfile.id}/profile` },
                  { title: "Logout", link: `` }
                ]}>
                  <Avatar src={authContext.userAvatar} />
                </MyButtonMenu>
              </>
            ) : (
              <>
                <Button variant="contained" href="/login">
                  Sign in
                </Button>
                <Button variant="outlined" href="/register">
                  Sign up
                </Button>

              </>
            )
          }

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Grid>
  );
};

export default PageHeader;