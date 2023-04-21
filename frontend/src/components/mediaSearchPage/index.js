import { Grid, Typography } from "@mui/material";
import PageTemplate from "../pageTemplate"
import { capitalizeFirstLowercaseRest } from "../../util";
import SortAndFilterCard from "../sortAndFilterCard";
import { useParams } from "react-router-dom";
import SearchList from "../searchList";
const MediaSearchPage = (props) => {
  const media_type = capitalizeFirstLowercaseRest(props.media_type)
  const { page } = useParams();

  return (
    <PageTemplate>
      <Grid container spacing={1}>
        <Grid xs={8}>
          <Typography variant="h5" mt={2} ml={2}>
            {media_type}s
          </Typography>
          <SearchList page={page} />
        </Grid>
        <Grid sx={{ paddingX: 1, paddingY: 5 }} xs={4}>
          {/* <SortCard /> */}
          <SortAndFilterCard media_type={media_type} />
        </Grid>
      </Grid>
    </PageTemplate >
  )
}
export default MediaSearchPage;