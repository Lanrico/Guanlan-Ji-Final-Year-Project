import { Button, Checkbox, Chip } from "@mui/material";

const FilterCardCheckbox = (props) => {
  const label = { inputProps: { 'aria-label': 'Filter checkbox' } };

  return (
    // <Checkbox
    //   {...label}
    //   icon={
    //     <Button variant="outlined" size="small" color={"inherit"}>
    //       {props.text}
    //     </Button>
    //   } checkedIcon={
    //     <Button variant="contained" size="small" >
    //       {props.text}
    //     </Button>
    //   }
    //   sx={{ p: 0.5 }}
    // />
    <Checkbox
      {...label}
      icon={
        <Chip variant="outlined" label={props.text} />
      } checkedIcon={
        <Chip label={props.text} color="primary" sx={{ color: "white" }} />
      }
      sx={{ p: 0.5 }}
    />
  )
}

export default FilterCardCheckbox;