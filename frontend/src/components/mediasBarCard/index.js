import { Grid, IconButton, ImageListItem, ImageListItemBar, Link } from "@mui/material";
import React from "react";

const MediasBarCard = ({ item }) => {

  console.log(item)
  return (
    <Grid key={item.movie.id} item xs={3}>
      <Link href={`/medias/movie/${item.movie.id}`}>
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