import { Card, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from "@mui/material";
import React from "react";
import SortIcon from '@mui/icons-material/Sort';

const SortCard = (props) => {
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <Card sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ fontSize: "20px" }}>
        <SortIcon sx={{ fontSize: "20px", mr: 1 }} />
        Sort
      </Typography>
      <FormControl size="small" fullWidth sx={{ marginTop: 1 }}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={handleChange}
          defaultValue={"Rating"}
        >
          <MenuItem value={"Rating"}>Rating</MenuItem>
          <MenuItem value={"Popularity"}>Popularity</MenuItem>
          <MenuItem value={"Release_Date"}>Release Date</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={"Descend"}
          sx={{ display: "flex", justifyContent: "start", marginTop: 1 }}
        >
          <FormControlLabel sx={{ padding: 0 }} value="Descend" control={<Radio size="small" />} label="Descend" />
          <FormControlLabel value="Ascend" control={<Radio size="small" />} label="Ascend" />
        </RadioGroup>
      </FormControl>
    </Card>
  )
}

export default SortCard;