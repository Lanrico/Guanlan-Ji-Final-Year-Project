import { List, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import OtherHistoryItemTemplate from "./otherHistoryItemTemplate";

const OtherHistoryTemplate = (props) => {

  return (
    <>
      <List pt={2} direction="column" style={{ maxHeight: 220, overflow: 'auto' }}>
        {
          props.items.map((i) =>
            <OtherHistoryItemTemplate item={i} type={props.type}></OtherHistoryItemTemplate>
          )
        }
      </List>
    </>
  )
}
export default OtherHistoryTemplate;