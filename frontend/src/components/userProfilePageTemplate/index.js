import { Avatar, Button, Card, Chip, Grid, Paper, Typography, useTheme } from "@mui/material";
import PageTemplate from "../pageTemplate";
import AvatarDemo from "../../images/AvatarDemo.jpg"
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';
import { blue } from "@mui/material/colors";

import StyledHeader from "../userProfileInfo/layout/MainLayout/Header"
import StyledDrawer from "../userProfileInfo/layout/MainLayout/Drawer";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../userProfileInfo/store";
import { openDrawer } from "../userProfileInfo/store/reducers/menu";
import Navigation from "../userProfileInfo/layout/MainLayout/Drawer/DrawerContent/Navigation";
import DrawerContent from "../userProfileInfo/layout/MainLayout/Drawer/DrawerContent";
import SettingDialog from "../settingDialog";
import { AuthContext } from "../../context/authContext";
import { useParams } from "react-router-dom";
import Favourite from "../userProfileTabs/favourite";
import History from "../userProfileTabs/history";
import Recommendation from "../userProfileTabs/Recommendation";

const UserPageTemplete = (props) => {
  const theme = useTheme();
  const { tab } = useParams();
  const { drawerOpen } = useSelector((state) => state.menu);
  const authContext = useContext(AuthContext);

  const [open, setOpen] = useState(true);

  const avatarSize = 120;
  const [openSetting, setOpenSetting] = useState(false);
  // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleSettingOpen = () => {
    setOpenSetting(true);
  };

  const handleSettingClose = (value) => {
    setOpenSetting(false);
    // setSelectedValue(value);
  };
  return (
    <PageTemplate>
      <Paper sx={{ backgroundColor: theme.palette.primary.light }} elevation={0}>
        <Paper sx={{ opacity: 0.1, height: 200 }}>
        </Paper>
        <Paper elevation={0} sx={{ px: 8, borderRadius: 0 }}>
          <Paper elevation={0} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Paper elevation={0}>
              <Avatar
                alt={props.user.name}
                src={authContext.userAvatar}
                sx={{ width: `${avatarSize}px`, height: `${avatarSize}px`, marginTop: `-${avatarSize / 2 + avatarSize / 50}px`, border: "4px solid #fff", position: "absolute" }}
              />

              <Typography variant="h4" sx={{ fontWeight: 'bold' }} pt={11}>
                {props.user.name}
              </Typography>
              <div style={{ display: "flex", marginTop: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: "grey" }}>
                  {props.user.email}
                </Typography>
                {
                  props.user.birthday ?
                    (
                      <Chip sx={{ ml: 1 }} icon={<CakeIcon />} label={<Typography sx={{ fontWeight: 'bold', color: "grey" }}>{props.user.birthday}</Typography>} />
                    ) : (
                      null
                    )
                }
                {
                  props.user.country ?
                    (
                      <Chip sx={{ ml: 1 }} icon={<img style={{ height: 15, marginLeft: 10 }} alt="Natacha" src={`https://flagcdn.com/w20/${props.user.country.id.toLowerCase()}.png`} />} label={<Typography sx={{ fontWeight: 'bold', color: "grey" }}>{props.user.country.englishName}</Typography>} />
                    ) : (
                      null
                    )
                }
              </div>
            </Paper>
            <Paper elevation={0}>
              <Button size="large" onClick={handleSettingOpen} startIcon={<SettingsIcon color="inherit" />} sx={{ mt: 1 }}>
                Update avatar
              </Button>
              <SettingDialog
                // selectedValue={selectedValue}
                open={openSetting}
                onClose={handleSettingClose}
              />
            </Paper>
          </Paper>
        </Paper>
        <Paper elevation={0} sx={{ borderRadius: 0 }}>
          <Grid container  >
            <Grid xs={3}>
              <DrawerContent />
            </Grid>
            {/* <div id="drawer-container" style={{ position: "relative" }}>
              <StyledHeader open={open} handleDrawerToggle={handleDrawerToggle} />
              <StyledDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
            </div> */}
            <Grid xs={9} p={3}>
              {
                tab === "profile" ?
                  (<>
                    profile
                  </>) :
                  tab === "history" ?
                    (
                      <History />
                    ) :
                    tab === "favourite" ?
                      (
                        <Favourite />
                      ) :
                      tab === "recommendation" ?
                        (
                          <Recommendation />
                        ) :
                        tab === "accountConfig" ?
                          (<>accountConfig
                          </>) :
                          tab === "interestConfig" ?
                            (<>interestConfig
                            </>) :
                            null
              }
            </Grid>
          </Grid>
        </Paper>

      </Paper>
    </PageTemplate>
  )
}

export default UserPageTemplete;