import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import PageFooter from "../pageFooter";
import PageHeader from "../pageHeader";
import { AuthContext } from "../../context/authContext";
import recommedationService from "../../api/recommedationService";

const PageTemplate = (props) => {
  const authContext = React.useContext(AuthContext);
  console.log(authContext)
  useEffect(() => {
    if (authContext.isAuthenticated) {
      const interval = setInterval(() => {
        recommedationService.generateRecommendation(authContext.userProfile.id);
      }, 10000);
    }
  }, [authContext.isAuthenticated, authContext.userProfile.id])
  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={10} lg={7}>
        <PageHeader />
        {props.children}
        <PageFooter />
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default PageTemplate;