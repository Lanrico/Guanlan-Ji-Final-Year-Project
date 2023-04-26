import { Button, List } from "@mui/material";
import RankingListItem from "../rankingListItem";
import { useQuery } from "react-query";
import recommedationService from "../../api/recommedationService";
import Spinner from "../spinner";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { divideList } from "../../util";
import RefreshIcon from '@mui/icons-material/Refresh';
const Recommendation = (props) => {
  const { user_id } = useParams();
  const [group, setGroup] = useState(0);
  const { data, error, isLoading, isError } = useQuery(
    ["recommendMedia", { id: user_id }], recommedationService.getById
  )

  const handleGroupChange = () => {
    if (group === medias.length - 1) {
      setGroup(0);
    }
    else {
      setGroup(group + 1);
    }
    console.log(group)
  }

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    console.log("error")
    return <h1>{error.message}</h1>
  }
  console.log(data)
  const medias = divideList(data.data, 5);

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          medias.length > 0 ?
            medias[group].map((m) =>
              <RankingListItem media={m} type="recommendation" />
            ) : null
        }
      </List>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
        <Button onClick={handleGroupChange} startIcon={<RefreshIcon />}>
          I want some more
        </Button>
      </div>
    </>
  )
}

export default Recommendation;