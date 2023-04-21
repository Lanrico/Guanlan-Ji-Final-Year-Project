import { useQuery } from "react-query";
import Spinner from "../spinner";
import reviewService from "../../api/reviewService";
import { useLocation } from "react-router-dom";
import OtherHistoryTemplate from "./otherHistoryTemplate";

const ReviewHistoryList = (props) => {
  const location = useLocation();

  const { data, error, isLoading, isError } = useQuery(
    ["ReviewHistory", { id: props.user }, location.pathname], reviewService.getById
  )

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }
  const reviewHistory = data.data;

  return (
    <>
      <OtherHistoryTemplate items={reviewHistory} type="review" />
    </>
  )
}

export default ReviewHistoryList;