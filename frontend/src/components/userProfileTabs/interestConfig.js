import { Alert, Box, Button, Collapse, Grid, IconButton, Typography } from "@mui/material";
import FilterCardCheckbox from "../filterCardCheckbox";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import CloseIcon from '@mui/icons-material/Close';
import genresService from "../../api/genresService";


const InterestConfig = () => {
  useEffect(() => {
    genresService.getAll().then((response) => {
      setGenres(response.data);
    });
  }, [])
  const [genres, setGenres] = useState([]);
  const authContext = useContext(AuthContext)
  const [genresChecked, setGenresChecked] = React.useState(authContext.userProfile.genres)
  const [open, setOpen] = React.useState(false)

  const handleSave = () => {
    var tmp = authContext.userProfile;
    tmp.genres = genresChecked;
    console.log(tmp)

    authContext.handleSetUserProfile(tmp);
    setOpen(true);
  }

  const genresList = genresChecked.map((g) => g.id);
  console.log(authContext.userProfile.genres)

  return (
    <>
      <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
        My interest genres
      </Typography>
      {
        genres.map((g) => {
          console.log(genresList.includes(g.id))
          return (
            <FilterCardCheckbox value={g.id} text={g.name} checked={genresList.includes(g.id)} onChange={(event) => {
              var tmp = genresChecked;
              if (event.target.checked) {
                tmp.push({
                  id: g.id,
                })
              } else {
                tmp = tmp.filter((item) => item.id !== g.id)
              }
              setGenresChecked(tmp)
              console.log(genresChecked)
            }} />
          )
        })
      }
      <Grid container xs={12} justifyContent={"center"} mt={4}>
        <Button
          disableElevation
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              You have successfully updated your interest genres.
            </Alert>
          </Collapse>
        </Box>
      </Grid>
    </>
  )
}

export default InterestConfig;