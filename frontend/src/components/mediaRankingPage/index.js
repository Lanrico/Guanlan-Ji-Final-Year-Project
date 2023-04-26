import { Grid, Typography, useMediaQuery } from "@mui/material";
import PageTemplate from "../pageTemplate"
import { capitalizeFirstLowercaseRest } from "../../util";
import RankingList from "../rankingList";
import SortAndFilterCard from "../sortAndFilterCard";
import { useParams } from "react-router-dom";
const MediaRankingPage = (props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const media_type = capitalizeFirstLowercaseRest(props.media_type)
  const { page } = useParams();

  return (
    <PageTemplate>
      <Grid container spacing={1}>
        <Grid xs={isMobile ? 12 : 8}>
          <Typography variant="h5" mt={2} ml={2}>
            {media_type}s
          </Typography>
          <RankingList page={page} />
        </Grid>
        <Grid sx={{ paddingX: 1, paddingY: 5 }} xs={isMobile ? 12 : 4}>
          {/* <SortCard /> */}
          <SortAndFilterCard media_type={media_type} />
        </Grid>
      </Grid>
    </PageTemplate >
  )
}
export default MediaRankingPage;