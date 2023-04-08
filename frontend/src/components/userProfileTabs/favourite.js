import { Grid, Pagination, PaginationItem } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import MediaCard from "./mediaCard";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import favouriteService from "../../api/favouriteService";
import Spinner from "../spinner";

const Favourite = (props) => {
  const { user_id } = useParams();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { data, error, isLoading, isError } = useQuery(
    ["favouriteByPage", { user: user_id, pageSize: 12, page: page - 1 }, location.pathname], favouriteService.getAllFavourteByPage
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return null
  }

  const favouriteList = data.data.content.map((favourite) => favourite.id.mid);

  return (
    <Grid direction="column" spacing={3}>
      <Grid container spacing={2}>
        {favouriteList.map((id) => {
          return (
            <Grid item xs={6} md={4} lg={4}>
              <MediaCard media={id}></MediaCard>
            </Grid>
          )
        })}

      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
        <Pagination count={data.data.totalPages} page={page} color={'primary'} onChange={(e, value) => setPage(value)}
        // renderItem={(item) => (
        //   <PaginationItem component={Link} to={`/ranking/movie/${item.page}`} {...item} />
        // )}
        />
      </div>
    </Grid>

  )
}

export default Favourite;