import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MediaInfoItem from '../mediaInfoItem';
import { listToString } from '../../util';

const MediaInfoList = (props) => {
  const languageConverter = {
    "en": "English",
    "ko": "Korean"
  }



  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MediaInfoItem itemName={"Title"} value={props.media.movie.title} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Release date"} value={props.media.movie.releaseDate} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Original language"} value={languageConverter[props.media.movie.originalLanguage]} />
      {props.media.originalLanguage === "en" ? (
        null
      ) : (
        <>
          <Divider variant="fullWidth" component="li" />
          <MediaInfoItem itemName={"Original title"} value={props.media.movie.originalTitle} />
        </>
      )}
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Genres"} value={listToString(props.media.genres, "name")} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Budget"} value={props.media.movie.budget} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Production Companies"} value={listToString(props.media.companies, "name")} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Production Countries"} value={listToString(props.media.countries, "englishName")} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Revenue"} value={props.media.movie.revenue} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Runtime"} value={props.media.movie.runtime + " min"} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Spoken Languages"} value={listToString(props.media.languages, "englishName")} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Status"} value={props.media.movie.status} />
    </List>
  )
}

export default MediaInfoList;