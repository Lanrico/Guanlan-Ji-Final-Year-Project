import React, { useState } from "react";
export const MediaContext = React.createContext(null);

const MediaContextProvider = (props) => {
  const [movieFilter, setMovieFilter0] = useState({
    sort: 'finalRate',
    order: 'desc',
    startDate: null,
    endDate: null,
    language: 'xx',
    rate: [0, 10],
    runtime: [0, 400],
    genresChecked: {
      28: false,
      12: false,
      16: false,
      35: false,
      80: false,
      99: false,
      18: false,
      10751: false,
      14: false,
      36: false,
      27: false,
      10402: false,
      9648: false,
      10749: false,
      878: false,
      10770: false,
      53: false,
      10752: false,
      37: false
    }
  })
  // const existingMovieFilter = localStorage.getItem("movieFilter");
  // const [movieFilter, setMovieFilter0] = useState(existingMovieFilter)
  const setMovieFilter = (filter) => {
    setMovieFilter0(filter)
    localStorage.setItem("movieFilter", filter);
  }
  return (
    <MediaContext.Provider
      value={{
        movieFilter,
        setMovieFilter
      }}
    >
      {props.children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;