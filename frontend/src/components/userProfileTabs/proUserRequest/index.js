import { useContext } from "react"
import { AuthContext } from "../../../context/authContext"
import { useQuery } from "react-query"
import proUserRequestService from "../../../api/proUserRequestService"
import Spinner from "../../spinner"
import { List, Typography } from "@mui/material"
import RequestItem from "./requestItem"


const ProUserRequest = (props) => {
  const authContext = useContext(AuthContext)
  const { data, error, isLoading, isError } = useQuery(
    ["proUserRequest"], proUserRequestService.getAll
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return null
  }

  const requests = data.data;

  return authContext.userProfile.type === 2 ? (
    <>
      <List pt={2} direction="column" style={{ maxHeight: 800, overflow: 'auto' }}>
        {
          requests.map((i) => {
            return i.status === null ? (
              <RequestItem request={i}></RequestItem>
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

export default ProUserRequest;