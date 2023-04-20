import { List, Typography } from "@mui/material";
import CheckReviewItem from "./checkReviewItem";
import { useQuery } from "react-query";
import reportService from "../../../api/reportService";
import Spinner from "../../spinner";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";


const CheckReview = (props) => {
  const authContext = useContext(AuthContext)
  const { data, error, isLoading, isError } = useQuery(
    ["checkReview"], reportService.getAll
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return null
  }

  const reports = data.data;

  return authContext.userProfile.type === 2 ? (
    <>
      <List pt={2} direction="column" style={{ maxHeight: 800, overflow: 'auto' }}>
        {
          reports.map((i) => {
            return !i.reviewResult ? (
              <CheckReviewItem report={i}></CheckReviewItem>
            ) : null
          }
          )
        }
      </List>
    </>
  ) : (
    <Typography variant="h6" color="textSecondary" component="p">
      You are not a moderator
    </Typography>
  )
}

export default CheckReview;