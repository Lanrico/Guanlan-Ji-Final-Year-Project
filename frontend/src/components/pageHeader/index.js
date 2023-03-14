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
import MoreIcon from '@mui/icons-material/MoreVert';
import SimpleLogo from '../../images/SimpleLogo.png';
import { Avatar, Button, ButtonGroup, Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import MenuButton from "../menuButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import AvatarDemo from "../../images/AvatarDemo.jpg"
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
  const [avatarMenuOpen, setAvatarMenuOpen] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleAvatarClick = (event) => {
    setAvatarMenuOpen(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarMenuOpen(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
            <img src={SimpleLogo} height="50px" alt="companylogo"></img>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MyButtonGroup variant="text" color="inherit" style={{ color: 'grey' }}>
              <MenuButton title="Game" textList={["Ranking", "Recommandation", "History", "Trending", "Genres"]} linkList={["/ranking/game", "", ""]} />
              <MenuButton title="Movie" textList={["Ranking", "Recommandation", "History", "Trending", "Genres"]} linkList={["/ranking/movie/1", "", ""]} />
              <MenuButton title="Music" textList={["Ranking", "Recommandation", "History", "Trending", "Genres"]} linkList={["/ranking/music", "", ""]} />
            </MyButtonGroup>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {
            authContext.isAuthenticated ? (
              <>
                {/* <IconButton onClick={handleAvatarClick}>
                  <Avatar src={AvatarDemo}>
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={avatarMenuOpen}
                  keepMounted
                  open={Boolean(avatarMenuOpen)}
                  onClose={handleAvatarClose}
                >
                  <MenuItem color="primary" onClick={handleAvatarClose}>Profile</MenuItem>
                  <MenuItem onClick={handleAvatarClose}>My account</MenuItem>
                  <MenuItem onClick={handleAvatarClose}>Logout</MenuItem>
                </Menu> */}
                <MyButtonMenu items={[
                  { title: "Profile", link: `/user/${authContext.userProfile.id}` },
                  { title: "Logout", link: `` }
                ]}>
                  <Avatar src={authContext.userAvatar} />
                </MyButtonMenu>
                {/* <Button href={`/user/${authContext.userProfile.id}`}></Button> */}
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