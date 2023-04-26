import { Grid, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MediasBarCard = ({ item, xs }) => {
  console.log(item.movie);
  if (!item.movie) {
    return null;
  }
  return (
    <Grid key={item.movie.id} item xs={xs ? xs : 3}>
      <Link to={`/medias/movie/${item.movie.id}`}>
        <ImageListItem key={item.movie.id} style={{ width: "90%" }}>
          <img
            src={
              item.movie.posterPath
                ? `https://image.tmdb.org/t/p/w500/${item.movie.posterPath}`
                : `../../images/film-poster-placeholder.png`
            }
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            title={item.movie.title}
            position="bottom"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                aria-label={`star ${item.movie.title}`}
              >
              </IconButton>
            }
            actionPosition="left"
          />
        </ImageListItem>
      </Link>
    </Grid>
  )
}

export default MediasBarCard;