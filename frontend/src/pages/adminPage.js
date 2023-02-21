import { Button, TextField } from "@mui/material";
import PageTemplate from "../components/pageTemplate";
import { useQuery } from "react-query";
import { getAllMovies, getMovies } from "../api/tmdb-api";
import { useState } from "react";
import allMovies from './../sampleData/movie_ids_02_18_2023.json'
// import allCollections from './../sampleData/collection_ids_02_18_2023.json'
// import allCompanies from './../sampleData/production_company_ids_02_18_2023.json'
import movieService from "../api/movieService";
import { addMovieDetailedListByMovieList, cleanMovieData } from "../dataManagement/movie";
import { addCollectionDetailedListByCollectionList } from "../dataManagement/collection";
import { addCompanyDetailedListByCompanyList } from "../dataManagement/company";
const AdminPage = (props) => {
  const [text, setText] = useState(null)
  // const { data, error, isLoading, isError } = useQuery(
  //   "allmovies",
  //   getAllMovies
  // );
  // fetch('./../sampleData/movieShort.json')
  //   .then((response) => response.json())
  //   .then((json) => {
  //     setText(json)
  //   });
  // if (isLoading) {
  //   return <Button />;
  // }

  // if (isError) {
  //   return <h1>{error.message}</h1>;
  // }
  const AddMovieButton = () => {
    addMovieDetailedListByMovieList(cleanMovieData(allMovies))
  }

  const ImportMovieButton = () => {
    // allMovies.map((m) => {
    //   m['media'] = {
    //     popularity: m.popularity,
    //     type: '0'
    //   }
    //   return m
    // })
    // setText(allMovies);

  }

  return (
    <PageTemplate>
      <TextField fullWidth label="Movie Data" id="movieData" onChange={(v) => setText(v.target.value)} value={JSON.stringify(text)} multiline maxRows={50} />
      {/* <Button variant="outlined" onClick={ImportMovieButton}>导入数据</Button> */}
      <Button variant="outlined" onClick={AddMovieButton}>发送给api</Button>
    </PageTemplate>
  )
}

export default AdminPage;