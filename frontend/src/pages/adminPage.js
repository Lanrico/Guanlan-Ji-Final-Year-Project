import { Button, TextField } from "@mui/material";
import PageTemplate from "../components/pageTemplate";
import { useQuery } from "react-query";
import { getMovies } from "../api/tmdb-api";
import { useState } from "react";

const AdminPage = (props) => {
  const [text, setText] = useState(null)
  const { data, error, isLoading, isError } = useQuery(
    ["discover", 1],
    getMovies
  );

  if (isLoading) {
    return <Button />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  var newMovie;
  const AddMovieButton = () => {
    setText(data);
  }

  return (
    <PageTemplate>
      <TextField fullWidth label="Movie Data" id="movieData" value={JSON.stringify(text)} multiline maxRows={50} />
      <Button variant="outlined" onClick={AddMovieButton}>123</Button>
    </PageTemplate>
  )
}

export default AdminPage;