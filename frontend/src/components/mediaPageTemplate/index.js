import { Grid, IconButton, Paper, Typography } from "@mui/material";
import CastBar from "../cast/castBar";
import MediaActionTabs from "../mediaActionTabs";
import MediaDetailRateBlock from "../mediaDetailRateBlock";
import MediaInfoList from "../mediaInfoList";
import PageTemplate from "../pageTemplate"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import historyService from "../../api/historyService";

const MediaPageTemplate = (props) => {
  const authContext = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(authContext.favouriteList.includes(props.media.id));

  console.log(authContext.favouriteList)
  // Add to history by api when enter the page
  useEffect(() => {
    historyService.create(authContext.userProfile.id, props.media.id)
      .then((res) => {
        if (res.status === 200) {
          console.log("history modified")
        } else if (res.status === 201) {
          console.log("history created")
        }
        console.log(res)
      })
  }, [authContext.userProfile.id, props.media.id])
  const handleSetFavourite = () => {
    setIsFavourite(true);
    authContext.addFavourite(props.media.id);
  }

  const handleSetUnfavourite = () => {
    setIsFavourite(false);
    authContext.removeFavourite(props.media.id);
  }
  return (
    <PageTemplate>
      {props.media_type === "movie" ? (
        <>
        </>
      ) : props.media_type === "game" ? (
        <>
          This is the game detail template page.
        </>
      ) : props.media_type === "music" ? (
        <>
          This is the music detail template page.
        </>
      ) : (
        <>
          This is error page
        </>
      )}
      {props.children}
      <Grid container spacing={3} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {
                !isFavourite ? (
                  <IconButton onClick={handleSetFavourite}>
                    <FavoriteBorderIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleSetUnfavourite}>
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                )
              }

              <Typography variant="h6">{props.media.movie.originalTitle}</Typography>
            </div>
            <Paper>
              <img
                src={`https://image.tmdb.org/t/p/w500/${props.media[props.media_type].posterPath}`}
                alt={props.media.movie.title}
                loading="lazy"
                width={'99%'}
              />
            </Paper>
          </div>
          <MediaInfoList
            media_type={props.media_type}
            media={props.media}
          />
        </Grid>

        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Typography variant="body1" component="p">
                {props.media[props.media_type].overview}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <MediaDetailRateBlock media={props.media} />
            </Grid>
          </Grid>
          <CastBar media={props.media} />
          <MediaActionTabs />
        </Grid>
      </Grid>
    </PageTemplate>
  )
}
export default MediaPageTemplate;