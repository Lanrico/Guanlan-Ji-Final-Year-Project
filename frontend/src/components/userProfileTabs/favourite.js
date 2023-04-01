import { Grid } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import MediaCard from "./mediaCard";

const Favourite = (props) => {
  const authContext = useContext(AuthContext);
  return (

    <Grid container spacing={2}>
      {authContext.favouriteList.map((id) => {
        return (
          <Grid item xs={6} md={4} lg={4}>
            <MediaCard media={id}></MediaCard>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Favourite;