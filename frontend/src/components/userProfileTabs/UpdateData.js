import { Button, CircularProgress, Typography } from "@mui/material";
import regularUpdateService from "../../api/regularUpdateService";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const UpdateData = () => {
  const authContext = useContext(AuthContext)

  const [upLoading, setUpLoading] = React.useState(false);

  const handleUpdateDailyData = () => {
    setUpLoading(true);
    regularUpdateService.updateAllDailyMovie().then(() => {
      setUpLoading(false);
    }).catch(() => {
      console.log("Error in handle Update Daily");
      setUpLoading(false);
    });
  }

  const handleUpdateAllPopularity = () => {
    setUpLoading(true);
    regularUpdateService.updateAllPopularity().then(() => {
      setUpLoading(false);
    }).catch(() => {
      console.log("Error in handle Update Popularity");
      setUpLoading(false);
    });
  }

  const handleUpdateAllRate = () => {
    setUpLoading(true);
    regularUpdateService.updateAllFinalRate().then(() => {
      setUpLoading(false);
    }).catch(() => {
      console.log("Error in handle Update Rate");
      setUpLoading(false);
    });
  }

  return (
    <>
      {authContext.userProfile.type === 2 ? (
        <>
          <Typography color={"red"}>Warning! Don't use these buttons unless necessary</Typography>
          <div style={{ display: "flex", height: "100%", width: "100%", justifyContent: "space-evenly", flexDirection: "column" }}>
            {upLoading ?
              <CircularProgress />
              :
              <Button onClick={handleUpdateDailyData} variant="contained">Update Daily Movie Data</Button>
            }
            {upLoading ?
              <CircularProgress />
              :
              <Button onClick={handleUpdateAllPopularity} variant="contained">Update All Popularity</Button>
            }
            {upLoading ?
              <CircularProgress />
              :
              <Button onClick={handleUpdateAllRate} variant="contained">Update All Rate</Button>
            }
          </div>
        </>
      ) : null}
    </>
  )
}

export default UpdateData;