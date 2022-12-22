import { Grid } from "@mui/material";
import React from "react";
import MediasBarCard from "../mediasBarCard";

const MediasBar = ({ children, mb, medias }) => {
  return (
    <Grid mb={mb}>
      {children}
      <Grid container>
        {medias.map((item) => {
          return (
            <MediasBarCard item={item} />)
        })}
      </Grid>
    </Grid>
  )
}

export default MediasBar;