import { Card, CardHeader, CardMedia, Typography } from "@mui/material";
import movieService from "../../api/movieService";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { Link } from "react-router-dom";
import placeholder from "../../images/film-poster-placeholder.png"
import FavouriteRatingRow from "./favouriteRatingRow";
const MediaCard = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    ["fmovie", { id: props.media }], movieService.get
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  console.log(data)

  const media = data.data;
  return (
    <Link to={`/medias/movie/${media.movie.id}`} style={{ textDecorationLine: 'none' }}>
      <Card sx={{ maxWidth: 180 }}>
        <CardHeader sx={{ padding: '5px' }}
          title={
            <Typography textAlign={'center'} variant="subtitle1" noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {/* {truncate(media.movie.title, { length: 16 })}{" "} */}
              {media.movie.title}
            </Typography>
          }
        />
        <CardMedia

          sx={{ height: 200 }}
          image={
            media.movie.posterPath ? `https://image.tmdb.org/t/p/w500/${media.movie.posterPath}` : placeholder
          }
          alt={media.movie.title}
        />
        <FavouriteRatingRow media={media} />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              media.movie.title
            }
          </Typography>
        </CardContent> */}
      </Card>
    </Link>
  );
};

export default MediaCard;