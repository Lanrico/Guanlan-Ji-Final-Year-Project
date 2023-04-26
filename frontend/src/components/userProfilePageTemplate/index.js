import { Avatar, Button, Chip, Grid, Paper, Typography, useTheme } from "@mui/material";
import PageTemplate from "../pageTemplate";
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';

import { useContext, useEffect, useState } from "react";
import DrawerContent from "../userProfileInfo/layout/MainLayout/Drawer/DrawerContent";
import SettingDialog from "../settingDialog";
import { AuthContext } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";
import Favourite from "../userProfileTabs/favourite";
import History from "../userProfileTabs/history";
import Recommendation from "../userProfileTabs/Recommendation";
import UserProfile from "../userProfileTabs/userProfile";
import { dateFormatter } from "../../util";
import InterestConfig from "../userProfileTabs/interestConfig";
import CheckReview from "../userProfileTabs/checkReview";
import ProUserRequest from "../userProfileTabs/proUserRequest";
import StarsIcon from '@mui/icons-material/Stars';
import proUserRequestService from "../../api/proUserRequestService";
import img from '../../images/Unauthenticate.webp'
import UpdateData from "../userProfileTabs/UpdateData";

const UserPageTemplete = (props) => {
  const theme = useTheme();
  const { tab } = useParams();
  const authContext = useContext(AuthContext);

  const avatarSize = 120;
  const [openSetting, setOpenSetting] = useState(false);
  const [proUserRequest, setProUserRequest] = useState(null);
  useEffect(() => {
    proUserRequestService.getById0(props.user.id).then(res => {
      setProUserRequest(res.data)
    })
  }, [props.user.id])

  const handleSettingOpen = () => {
    setOpenSetting(true);
  };

  const handleSettingClose = (value) => {
    setOpenSetting(false);
    // setSelectedValue(value);
  };
  console.log(props.user)
  return (
    <PageTemplate>
      {
        props.user.id === authContext.userProfile.id ? (
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
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: '20px', display: props.user.type === 0 ? "none" : null }}></div>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }} color={props.user.type === 2 ? "primary" : props.user.type === 1 ? "secondary" : null} pt={11}>
                        {props.user.name}
                      </Typography>
                      <StarsIcon sx={{ mt: 11, display: props.user.type === 0 ? "none" : null }} color={props.user.type === 2 ? "primary" : "secondary"} />
                    </div>
                    {
                      props.user.type === 0 ?
                        null :
                        <Typography pl={2} variant="h6" sx={{ color: "grey" }} pt={12}>
                          {props.user.type === 1 && proUserRequest ? proUserRequest.job + " of " + proUserRequest.company : "website admin account"}
                        </Typography>
                    }
                  </div>
                  <div style={{ display: "flex", marginTop: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: "grey" }}>
                      {props.user.email}
                    </Typography>
                    {
                      props.user.birthday ?
                        (
                          <Chip sx={{ ml: 1 }} icon={<CakeIcon />} label={<Typography sx={{ fontWeight: 'bold', color: "grey" }}>{dateFormatter(props.user.birthday)}</Typography>} />
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
                  <Typography variant="subtitle1" sx={{ color: "grey" }}>
                    {props.user.bio}
                  </Typography>
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
                <Grid xs={9} p={3}>
                  {
                    tab === "checkReview" ?
                      (<>
                        <CheckReview />
                      </>) :
                      tab === "proUserRequest" ?
                        (<>
                          <ProUserRequest />
                        </>) :
                        tab === "updateData" ?
                          (<>
                            <UpdateData />
                          </>) :
                          tab === "profile" ?
                            (<>
                              <UserProfile />
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
                                  tab === "interestConfig" ?
                                    (<InterestConfig />) :
                                    null
                  }
                </Grid>
              </Grid>
            </Paper>

          </Paper>
        ) : (
          <Typography variant="h6" textAlign={"center"} sx={{ flexGrow: 1 }}>
            <br /><br />
            You can not access these content.
            <br />
            <img src={img} alt="Unauthenticate" />
            <br />
            Click <Link to={"/"} style={{ color: theme.palette.primary }}>here</Link> to return.
          </Typography>
        )
      }

    </PageTemplate>
  )
}

export default UserPageTemplete;