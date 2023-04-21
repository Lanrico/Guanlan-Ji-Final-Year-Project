import { List } from "@mui/material";
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