import { Alert, Box, Button, Grid, IconButton, Menu, Snackbar, TextField, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import reportService from "../../api/reportService";
import { AuthContext } from "../../context/authContext";

const ReportReviewButton = (props) => {
  const authContext = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [reason, setReason] = React.useState('');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReport = () => {
    reportService.addReportToMedia({
      rid: props.review,
      uid: {
        id: authContext.userProfile.id
      },
      reason: reason,
      time: new Date()
    }).then((response) => {
      handleClose()
      setOpenSuccess(true);
    })
  }
  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="report">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box width={450} minHeight={150}>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 4 }}>
            <ReportProblemOutlinedIcon fontSize="small" />
            <Typography mx={1} align="center">Report this review?</Typography>
            <ReportProblemOutlinedIcon fontSize="small" />
          </div>
          <Grid container justifyContent={"center"}>
            <TextField
              size="small"
              multiline
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              minRows={3}
              placeholder="Please enter your reason here"
              fullWidth
              sx={{ marginX: 2, marginY: 1 }}
            />

            <Button onClick={handleReport}>
              Report
            </Button>

          </Grid>
        </Box>
      </Menu>
      <Snackbar open={openSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} autoHideDuration={5000} severity="info" sx={{ width: '100%' }}>
          Report successfully! Your report will be reviewed by our staff.
        </Alert>
      </Snackbar>
    </>
  )
}
export default ReportReviewButton;