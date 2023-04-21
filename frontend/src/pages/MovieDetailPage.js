import MediaPageTemplate from "../components/mediaPageTemplate"
import { useParams } from "react-router-dom";
import movieService from "../api/movieService";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const MovieDetailPage = (props) => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(
    ["trendingMovie4", { id: id }], movieService.get
  )
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  const media = data.data;
  console.log(media)
  // const medias = movies.filter((m) => m.id.toString() === id); // 以后改为取电影id，用getMovie方法

  return (
    <MediaPageTemplate
      media_type="movie"
      media={media}
    >
    </MediaPageTemplate>
  )
}
export default MovieDetailPage;