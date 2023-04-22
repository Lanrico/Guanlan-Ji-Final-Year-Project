import { IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, useTheme } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import placeholder from "../../images/film-poster-placeholder.png"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import movieService from "../../api/movieService"
import Spinner from "../spinner"
import { AuthContext } from "../../context/authContext"
import { dateTimeFormatter } from "../../util"
import historyService from "../../api/historyService"
import genresService from "../../api/genresService"
const BrowseListItem = (props) => {
  useEffect(() => {
    genresService.getAll().then((response) => {
      setGenres(response.data);
    });
  })
  const [genres, setGenres] = useState([]);
  const theme = useTheme();
  const authContext = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(authContext.favouriteList.includes(props.media_id));
  const [isDeleted, setIsDeleted] = useState(false);
  const [showSecondaryAction, setShowSecondaryAction] = useState(false);

  const { data, error, isLoading, isError } = useQuery(
    ["movieBCard", { id: props.media_id }], movieService.get
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  const media = data.data;

  const handleDeleteHistory = () => {
    setIsDeleted(true);
    historyService.delete(authContext.userProfile.id, props.media_id)
  }
  return (
    <ListItem alignItems="flex-start" sx={{ display: isDeleted ? "none" : "flex" }} onMouseEnter={() => setShowSecondaryAction(true)} onMouseLeave={() => setShowSecondaryAction(false)}>
      <ListItemAvatar sx={{ marginRight: 1 }}>
        <img
          src={media.movie.posterPath ? `https://image.tmdb.org/t/p/w500/${media.movie.posterPath}` : placeholder}
          alt={media.movie.title}
          loading="lazy"
          width={80}
        />
      </ListItemAvatar>
      {showSecondaryAction && (
        <ListItemSecondaryAction sx={{ top: "17%" }}>
          <IconButton size="small" onClick={handleDeleteHistory}>
            <DeleteOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
      <ListItemText
        primary={
          <React.Fragment>

            <div style={{ display: "flex" }}>
              <Link to={`/medias/movie/${props.media_id}`} style={{ textDecoration: "none", color: theme.palette.primary.main }}>
                <Typography noWrap mr={1}> {media.movie.title}</Typography>
              </Link>
              {
                media.movie.originalTitle && media.movie.originalLanguage !== "en" ? (
                  <Typography noWrap color="text.secondary">{media.movie.originalTitle}</Typography>
                ) : (
                  null
                )
              }

            </div>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 100 }}>
              <div style={{ display: "flex", marginTop: 5 }}>
                {media.movie.releaseDate}
                {genres.map((m) => {
                  if (media.genres.find((n) => n.id === m.id)) {
                    return ' / ' + m.name
                  }
                  else {
                    return null;
                  }
                })}
              </div>

              <Typography variant="body2" noWrap mt={"4px"} sx={{ textAlign: "right" }}>
                browsed at {dateTimeFormatter(props.time)}
              </Typography>
            </div>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default BrowseListItem;