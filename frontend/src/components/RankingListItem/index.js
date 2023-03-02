import { Chip, Divider, Link, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Rating, Typography } from "@mui/material"
import { yellow } from "@mui/material/colors"
import React from "react"
import genres from "../../sampleData/genres"
import placeholder from "../../images/film-poster-placeholder.png"

const RankingListItem = (props) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar sx={{ marginRight: 1 }}>
          <img
            src={props.media.movie.posterPath ? `https://image.tmdb.org/t/p/w500/${props.media.movie.posterPath}` : placeholder}
            alt={props.media.movie.title}
            loading="lazy"
            width={80}
          />
        </ListItemAvatar>
        <ListItemSecondaryAction sx={{ top: "20%" }}>
          <Chip
            color='primary'
            label={
              <Typography fontSize={"small"} sx={{ color: "white" }}>Rank {props.rank}</Typography>
            }
            size="small"
          />
        </ListItemSecondaryAction>
        <ListItemText
          primary={
            <React.Fragment>
              <div style={{ display: "flex" }}>
                <Link href={`/medias/movie/${props.media.id}`} underline="none">
                  <Typography noWrap mr={1}> {props.media.movie.title}</Typography>
                </Link>
                {
                  props.media.movie.originalTitle && props.media.movie.originalLanguage !== "en" ? (
                    <Typography noWrap color="text.secondary">{props.media.movie.originalTitle}</Typography>
                  ) : (
                    null
                  )
                }

              </div>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <div style={{ display: "flex", marginTop: 5 }}>
                {props.media.movie.releaseDate}
                {genres.genres.map((m) => {
                  if (props.media.genres.find((n) => n.id === m.id)) {
                    return ' / ' + m.name
                  }
                  else {
                    return null;
                  }
                })}
              </div>
              <Typography variant="body2" noWrap mt={"5px"}>
                {props.media.movie.overview}
              </Typography>
              <div style={{ display: "flex", marginTop: 5 }}>
                <Rating value={props.media.rate / 2} precision={0.1} readOnly size="small" />
                <Typography color={yellow[800]} fontSize={"small"} ml={1}>
                  {props.media.rate}
                </Typography>
                <Typography fontSize={"small"} ml={1}>
                  ({props.media.voteCount} users)
                </Typography>
              </div>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullwidth" component="li" />
    </>
  )
}

export default RankingListItem;