import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { deepOrange, green } from "@mui/material/colors";
import CastBar from "../cast/castBar";
import MediaActionTabs from "../mediaActionTabs";
import MediaDetailRateBlock from "../mediaDetailRateBlock";
import MediaInfoList from "../mediaInfoList";
import PageTemplate from "../pageTemplate"
import { capitalizeFirstLowercaseRest } from "../../util";
import RankingList from "../RankingList";
const MediaRankingPage = (props) => {
  console.log(props.media_type)
  const media_type = capitalizeFirstLowercaseRest(props.media_type)
  return (
    <PageTemplate>
      <Grid container spacing={1}>
        <Grid xs={8}>
          <Typography variant="h5" mt={2} ml={2}>
            All {media_type}s
          </Typography>
          <RankingList>

          </RankingList>
        </Grid>
        <Grid xs={4}>
          4234234
        </Grid>
      </Grid>
    </PageTemplate >
  )
}
export default MediaRankingPage;