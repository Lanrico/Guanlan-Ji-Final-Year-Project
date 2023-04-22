import { Button, Card, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import FilterCardCheckbox from "../filterCardCheckbox";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SortIcon from '@mui/icons-material/Sort';
import { MediaContext } from "../../context/mediaContextProvider";
import { dateFormatter, filterStringEncoder } from "../../util";
import languageService from "../../api/languageService";
import genresService from "../../api/genresService";

const SortAndFilterCard = (props) => {
  useEffect(() => {
    languageService.getAll().then((response) => {
      console.log(response.data)
      setLanguages(response.data);
    });

    genresService.getAll().then((response) => {
      console.log(response.data)
      setGenres(response.data);
    });
  }, []);
  const [genres, setGenres] = useState([]);
  const movieContext = useContext(MediaContext);
  const [genresChecked, setGenresChecked] = React.useState(movieContext.movieFilter.genresChecked)
  const [startDate, setStartDate] = React.useState(movieContext.movieFilter.startDate);
  const [endDate, setEndDate] = React.useState(movieContext.movieFilter.endDate);
  const [sort, setSort] = React.useState(movieContext.movieFilter.sort);
  const [order, setOrder] = React.useState(movieContext.movieFilter.order);
  const [language, setLanguage] = React.useState(movieContext.movieFilter.language);
  const [rate, setRate] = React.useState(movieContext.movieFilter.rate);
  const [runtime, setRuntime] = React.useState(movieContext.movieFilter.runtime);
  const [languages, setLanguages] = React.useState([]);
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };
  const handleSliderChange = (event, newValue) => {
    setRate(newValue);
  };
  const handleSlider2Change = (event, newValue) => {
    setRuntime(newValue);
  };

  return (
    <>
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
            onChange={handleSortChange}
            defaultValue={sort}
          >
            <MenuItem value={"finalRate"}>Rate</MenuItem>
            <MenuItem value={"popularity"}>Popularity</MenuItem>
            <MenuItem value={"releaseDate"}>Release Date</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={"Descend"}
            sx={{ display: "flex", justifyContent: "start", marginTop: 1 }}
            value={order}
            onChange={handleOrderChange}
          >
            <FormControlLabel sx={{ padding: 0 }} value="desc" control={<Radio size="small" />} label="Descend" />
            <FormControlLabel value="asc" control={<Radio size="small" />} label="Ascend" />
          </RadioGroup>
        </FormControl>
      </Card>

      <Card sx={{ padding: 2, mt: 1 }}>
        <Typography variant="h5" sx={{ fontSize: "20px", mb: 1 }}>
          <FilterAltIcon sx={{ fontSize: "20px", mr: 1 }} />
          Filter
        </Typography>
        <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
          Genres
        </Typography>
        {
          genres.map((g) => {
            return (
              <FilterCardCheckbox value={g.id} text={g.name} checked={genresChecked[g.id]} onChange={(event) => {
                var tmp = genresChecked;
                tmp[g.id] = event.target.checked;
                setGenresChecked(tmp)
                // console.log(genresChecked)
              }} />
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
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateFormats={"dayOfMonth"} dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            inputFormat="DD/MM/YYYY"
            openTo="year"
            minDate={(startDate)}
            renderInput={(params) => <TextField size="small" fullWidth {...params} sx={{ my: 1.5 }} />}
          />
        </LocalizationProvider>
        <Divider sx={{ my: 2 }} variant="fullwidth" />
        <Typography variant="h5" sx={{ fontSize: "18px", mb: 1 }}>
          Language
        </Typography>
        <FormControl size="small" fullWidth>
          {/* <InputLabel>Language</InputLabel> */}
          <Select
            value={language}
            // label="Language"
            onChange={handleLanguageChange}
            defaultValue={"English"}
          >
            {
              languages.map((l) => {
                return (
                  <MenuItem value={l.id}>{l.englishName}</MenuItem>
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
        <Divider sx={{ my: 2 }} variant="fullwidth" />
        {/* <Button fullWidth onClick={handleSubmitButton} href={filterStringEncoder(props.media_type, sort, order, dateFormatter(startDate), dateFormatter(endDate), language, rate, runtime, genresChecked)}>Submit</Button> */}
        <NavLink style={{ textDecoration: "none" }} to={filterStringEncoder(props.media_type, sort, order, dateFormatter(startDate), dateFormatter(endDate), language, rate, runtime, genresChecked)}>
          <Button fullWidth>Submit</Button>
        </NavLink>
        {/* <Button fullWidth onClick={handleSubmitButton1} >context checker</Button> */}
      </Card>
    </>
  )
}

export default SortAndFilterCard;