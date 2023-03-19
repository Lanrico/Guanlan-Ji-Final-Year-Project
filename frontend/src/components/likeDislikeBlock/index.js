import { IconButton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { AuthContext } from "../../context/authContext";

const LikeDislikeBlock = (props) => {
  const [likeNumber, setLikeNumber] = useState(props.likeNumber);
  const [dislikeNumber, setDislikeNumber] = useState(props.disLikeNumber);
  const [likeOrNot, setLikeOrNot] = useState(props.likeOrNot);
  const authContext = useContext(AuthContext)
  const handleLike = () => {
    if (likeOrNot === "like") {
      setLikeOrNot("")
      setLikeNumber(likeNumber - 1)
    }
    else if (likeOrNot === "dislike") {
      setLikeOrNot("like")
      setDislikeNumber(dislikeNumber - 1)
      setLikeNumber(likeNumber + 1)
    }
    else {
      setLikeOrNot("like")
      setLikeNumber(likeNumber + 1)
    }

  }
  const handleDislike = () => {
    if (likeOrNot === "dislike") {
      setLikeOrNot("")
      setDislikeNumber(dislikeNumber - 1)
    }
    else if (likeOrNot === "like") {
      setLikeOrNot("dislike")
      setLikeNumber(likeNumber - 1)
      setDislikeNumber(dislikeNumber + 1)
    }
    else {
      setLikeOrNot("dislike")
      setDislikeNumber(dislikeNumber + 1)
    }

  }

  return (
    <>
      <IconButton onClick={handleLike} aria-label="thumb up" disabled={!authContext.isAuthenticated}>
        {likeOrNot === "like" ? <ThumbUpAltIcon color="primary" /> : <ThumbUpOffAltIcon />}
      </IconButton>
      <Typography mr={1} color={likeOrNot === "like" ? 'primary' : 'gray'} variant="body2">{likeNumber}</Typography>
      <IconButton onClick={handleDislike} aria-label="thumb down" disabled={!authContext.isAuthenticated}>
        {likeOrNot === "dislike" ? <ThumbDownAltIcon color="error" /> : <ThumbDownOffAltIcon />}
      </IconButton>
      <Typography color={likeOrNot === "dislike" ? 'error' : 'gray'} variant="body2">{dislikeNumber}</Typography>
    </>
  )
}

export default LikeDislikeBlock;