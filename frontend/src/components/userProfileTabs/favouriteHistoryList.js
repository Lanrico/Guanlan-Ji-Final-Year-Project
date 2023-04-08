import { useQuery } from "react-query";
import Spinner from "../spinner";
import { useLocation } from "react-router-dom";
import OtherHistoryTemplate from "./otherHistoryTemplate";
import favouriteService from "../../api/favouriteService";

const FavouriteHistoryList = (props) => {
  const location = useLocation();

  const { data, error, isLoading, isError } = useQuery(
    ["FavouriteHistory", { user: props.user }, location.pathname], favouriteService.getAllFavourte
  )

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  const historyHistory = data.data;

  return (
    <>
      <OtherHistoryTemplate items={historyHistory} type="history" />
    </>
  )
}

export default FavouriteHistoryList;