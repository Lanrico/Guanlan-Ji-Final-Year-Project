import { Alert, Button, CircularProgress, FormHelperText, IconButton, Rating, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { grey, yellow } from "@mui/material/colors";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import reviewService from "../../api/reviewService";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { currentTime } from "../../util";
const WriteReviewPanel = (props) => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [isRecommend, setIsRecommend] = useState(true);
  const [rate, setRate] = useState(-1)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authContext = useContext(AuthContext)
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSuccessSnackClose = (event) => {
    setOpenSuccess(false);
  };
  const handleSubmit = (event) => {
    setIsSubmitting(true)
    reviewService.addReviewToMedia(
      id,
      {
        "uid": { "id": authContext.userProfile.id },
        "mid": { "id": id },
        "rate": rate,
        "isRecommend": isRecommend,
        "content": comment,
        "time": currentTime(),
        "isAudited": false,
        "like": 0,
        "dislike": 0
      }
    ).then((response) => {
      console.log(response)
      setIsSubmitting(false)
      setComment("");
      setRate(-1);
      setIsRecommend(true);
      setOpenSuccess(true)
    })
  };

  const handleRecommend = () => {
    setIsRecommend(!isRecommend);
  }

  const handleRateChange = (e) => {
    setRate(e.target.value * 2);
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        onClose={handleSuccessSnackClose}
      >
        <Alert
          severity="success"
          onClose={handleSuccessSnackClose}
        >
          <Typography variant="h5">
            Review submitted
          </Typography>
        </Alert>
      </Snackbar>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Write your review"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ marginY: 1 }}
          multiline
          minRows={2}
        />

        <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "flex-start" }}>
            <Typography mr={1} color={yellow[800]}>
              {rate < 0 ? "Choose your rate" : rate}
            </Typography>
            <Rating value={rate / 2} onClick={handleRateChange} precision={0.1} size="small" />
          </div>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "flex-start" }}>
            <Typography mr={1} color={grey}>
              Recommend this media?
            </Typography>
            <IconButton onClick={handleRecommend}>
              {isRecommend ? (
                <ThumbUpAltIcon fontSize="small" color="primary" />
              ) : (
                <ThumbDownAltIcon fontSize="small" color="error" />
              )}
            </IconButton>
            <Typography ml={1} color={isRecommend ? "primary" : "error"}>
              {isRecommend ? "Yes" : "No"}
            </Typography>
          </div>
          <Button type="submit" variant="contained" startIcon={isSubmitting ? <CircularProgress style={{ width: 20, height: 20 }} /> : <SendIcon />} disabled={(!comment || rate < 0 || isSubmitting)}>
            Send
          </Button>
        </div>
        <FormHelperText id="write-review-helper-text">
          Your previous review and rating will be overwritten and its like and dislike will be clear if you have already reviewed on this media.
        </FormHelperText>
      </Box>
    </>
  )
}

export default WriteReviewPanel;