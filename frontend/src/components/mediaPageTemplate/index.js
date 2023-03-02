import { Grid, Paper, Typography } from "@mui/material";
import CastBar from "../cast/castBar";
import MediaActionTabs from "../mediaActionTabs";
import MediaDetailRateBlock from "../mediaDetailRateBlock";
import MediaInfoList from "../mediaInfoList";
import PageTemplate from "../pageTemplate"

const MediaPageTemplate = (props) => {
  console.log(props.media)
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
          <CastBar />
          <MediaActionTabs />
        </Grid>
      </Grid>
    </PageTemplate>
  )
}
export default MediaPageTemplate;