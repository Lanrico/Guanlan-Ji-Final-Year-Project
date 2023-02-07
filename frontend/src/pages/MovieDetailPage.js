import MediaPageTemplate from "../components/mediaPageTemplate"
import movies from "../sampleData/movies";
import { useParams } from "react-router-dom";


const MovieDetailPage = (props) => {
  // const { data, error, isLoading, isError } = useQuery(
  //   "medias", MediaDataService.getAll
  // )
  // if (isLoading) {
  //   return <Spinner />
  // }
  // if (isError) {
  //   return <h1>{error.message}</h1>
  // }
  const { id } = useParams();
  const medias = movies.filter((m) => m.id.toString() === id); // 以后改为取电影id，用getMovie方法

  return (
    <MediaPageTemplate
      media_type="movie"
      media={medias[0]}
    >
    </MediaPageTemplate>
  )
}
export default MovieDetailPage;