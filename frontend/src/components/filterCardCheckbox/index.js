import { Checkbox, Chip } from "@mui/material";

const FilterCardCheckbox = (props) => {
  const label = { inputProps: { 'aria-label': 'Filter checkbox' } };

  return (
    <Checkbox
      {...label}
      value={props.value}
      defaultChecked={props.checked}
      onChange={props.onChange}
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