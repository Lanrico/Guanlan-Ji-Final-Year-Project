import { Chip, Divider, Link, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Rating, Typography } from "@mui/material"
import { yellow } from "@mui/material/colors"
import React from "react"
import genres from "../../sampleData/genres"

const RankingListItem = (props) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar sx={{ marginRight: 1 }}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${props.media.poster_path}`}
            alt={props.media.title}
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
                  <Typography mr={1}> {props.media.title}</Typography>
                </Link>
                {
                  props.media.original_title && props.media.original_language !== "en" ? (
                    <Typography color="text.secondary">{props.media.original_title}</Typography>
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
                {props.media.release_date}
                {genres.genres.map((m) => {
                  if (props.media.genre_ids.find((n) => n === m.id)) {
                    return ' / ' + m.name
                  }
                  else {
                    return null;
                  }
                })}
              </div>
              <Typography variant="body2" noWrap mt={"5px"}>
                {props.media.overview}
              </Typography>
              <div style={{ display: "flex", marginTop: 5 }}>
                <Rating value={props.media.vote_average / 2} precision={0.1} readOnly size="small" />
                <Typography color={yellow[800]} fontSize={"small"} ml={1}>
                  {props.media.vote_average}
                </Typography>
                <Typography fontSize={"small"} ml={1}>
                  ({props.media.vote_count} users)
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