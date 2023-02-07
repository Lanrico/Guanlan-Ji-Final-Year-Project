import { Card, Divider, FormControl, InputLabel, MenuItem, Select, Slider, Typography } from "@mui/material";
import React from "react";
import FilterCardCheckbox from "../filterCardCheckbox";
import genres from "../../sampleData/genres";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import languages from "../../sampleData/languages";

const FilterCard = (props) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [sort, setSort] = React.useState('');
  const [rate, setRate] = React.useState([0, 10]);
  const [runtime, setRuntime] = React.useState([0, 400]);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const handleSliderChange = (event, newValue) => {
    setRate(newValue);
  };
  const handleSlider2Change = (event, newValue) => {
    setRuntime(newValue);
  };

  return (
    <Card sx={{ padding: 2, mt: 1 }}>
      <Typography variant="h5" sx={{ fontSize: "20px", mb: 1 }}>
        <FilterAltIcon sx={{ fontSize: "20px", mr: 1 }} />
        Filter
      </Typography>
      <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
        Genres
      </Typography>
      {
        genres.genres.map((g) => {
          return (
            <FilterCardCheckbox text={g.name} />
          )
        })
      }
      <Divider sx={{ my: 2 }} variant="fullwidth" />
      <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
        Release date
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          inputFormat="DD/MM/YYYY"
          openTo="year"
          maxDate={(endDate)}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="End date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          inputFormat="DD/MM/YYYY"
          openTo="year"
          minDate={(startDate)}
          renderInput={(params) => <TextField size="small" {...params} sx={{ my: 1.5 }} />}
        />
      </LocalizationProvider>
      <Divider sx={{ my: 2 }} variant="fullwidth" />
      <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
        Language
      </Typography>
      <FormControl size="small" fullWidth>
        <InputLabel>Language</InputLabel>
        <Select
          value={sort}
          label="Language"
          onChange={handleChange}
          defaultValue={"English"}
        >
          {
            languages.map((l) => {
              return (
                <MenuItem value={l.english_name}>{l.english_name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <Divider sx={{ my: 2 }} variant="fullwidth" />
      <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
        Rate
      </Typography>
      <Typography id="non-linear-slider" gutterBottom>
        From {rate[0]} to {rate[1]}
      </Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        min={0}
        step={0.1}
        max={10}
        value={rate}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        marks={[
          {
            value: 0,
            label: '0',
          },
          {
            value: 10,
            label: '10',
          },
        ]}
        sx={{ px: 0 }}
        size="small"

      />
      <Divider sx={{ my: 2 }} variant="fullwidth" />
      <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
        Runtime
      </Typography>
      <Typography gutterBottom>
        From {runtime[0]} min to {runtime[1]} min
      </Typography>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        min={0}
        step={1}
        max={400}
        value={runtime}
        onChange={handleSlider2Change}
        valueLabelDisplay="auto"
        marks={[
          {
            value: 0,
            label: '0',
          },
          {
            value: 120,
            label: '120',
          },
          {
            value: 240,
            label: '240',
          },
          {
            value: 360,
            label: '360',
          },
        ]}
        sx={{ px: 0 }}
        size="small"
      />
    </Card>
  )
}

export default FilterCard;