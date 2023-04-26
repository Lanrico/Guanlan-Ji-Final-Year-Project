import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import img from './images/Unauthenticate.webp'
import { AuthContext } from "./context/authContext";
import PageTemplate from "./components/pageTemplate";

const ProtectedRoutes = () => {

  const context = useContext(AuthContext);
  const theme = useTheme();
  return context.isAuthenticated === true ? (
    <Outlet />
  ) : (
    <PageTemplate>
      <Typography variant="h6" textAlign={"center"} sx={{ flexGrow: 1 }}>
        <br /><br />
        You can not access these content if you are not sign in.
        <br />
        <img src={img} alt="Unauthenticate" />
        <br />
        Click <Link to={"/login"} style={{ color: theme.palette.primary }}>here</Link> to sign in your account.
      </Typography>
    </PageTemplate>
  );
};

export default ProtectedRoutes;