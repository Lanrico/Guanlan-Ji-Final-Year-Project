import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MediaInfoItem from '../mediaInfoItem';
import { listToString } from '../../util';

const MediaInfoList = (props) => {
  const languageConverter = {
    "en": "English",
    "ko": "Korean"
  }

  

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MediaInfoItem itemName={"Title"} value={props.media.title} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Release date"} value={props.media.release_date} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Original language"} value={languageConverter[props.media.original_language]} />
      {props.media.original_language === "en" ? (
        null
      ) : (
        <>
          <Divider variant="fullWidth" component="li" />
          <MediaInfoItem itemName={"Original title"} value={props.media.original_title} />
        </>
      )}
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Genres"} value={listToString(props.media.genres, "name")}/>
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Budget"} value={props.media.budget} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Production Companies"} value={listToString(props.media.production_companies, "name")} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Production Countries"} value={listToString(props.media.production_countries, "name")} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Revenue"} value={props.media.revenue} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Runtime"} value={props.media.runtime+" min"} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Spoken Languages"} value={listToString(props.media.spoken_languages, "english_name")} />
      <Divider variant="fullWidth" component="li" />
      <MediaInfoItem itemName={"Status"} value={props.media.status} />
    </List>
  )
}

export default MediaInfoList;