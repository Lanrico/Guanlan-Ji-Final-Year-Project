import { Grid, IconButton, ImageListItem, ImageListItemBar, Link } from "@mui/material";
import React from "react";

const MediasBarCard = ({ item }) => {


  return (
    <Grid key={item.id} item xs={3}>
      <Link href={`/medias/movie/${item.id}`}>
        <ImageListItem key={item.id} style={{ width: "90%" }}>
          <img
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                : `../images/film-poster-placeholder.png`
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
            title={item.title}
            position="bottom"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                aria-label={`star ${item.title}`}
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