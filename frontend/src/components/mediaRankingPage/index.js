import { FormControl, Grid, Typography } from "@mui/material";
import PageTemplate from "../pageTemplate"
import { capitalizeFirstLowercaseRest } from "../../util";
import RankingList from "../RankingList";
import SortCard from "../sort/sortCard";
import FilterCard from "../filterCard";
const MediaRankingPage = (props) => {
  const media_type = capitalizeFirstLowercaseRest(props.media_type)
  return (
    <PageTemplate>
      <Grid container spacing={1}>
        <Grid xs={8}>
          <Typography variant="h5" mt={2} ml={2}>
            All {media_type}s
          </Typography>
          <RankingList />

        </Grid>
        <Grid sx={{ paddingX: 1, paddingY: 5 }} xs={4}>
          <SortCard />
          <FilterCard />
        </Grid>
      </Grid>
    </PageTemplate >
  )
}
export default MediaRankingPage;