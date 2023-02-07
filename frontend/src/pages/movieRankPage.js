import { useParams } from "react-router-dom";
import MediaRankingPage from "../components/mediaRankingPage";


const MovieRankPage = (props) => {
  // const { data, error, isLoading, isError } = useQuery(
  //   "medias", MediaDataService.getAll
  // )
  // if (isLoading) {
  //   return <Spinner />
  // }
  // if (isError) {
  //   return <h1>{error.message}</h1>
  // }
  const { media_type } = useParams();

  return (
    <MediaRankingPage media_type={media_type}>
    </MediaRankingPage>
  )
}
export default MovieRankPage;