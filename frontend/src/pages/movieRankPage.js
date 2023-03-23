import { useParams } from "react-router-dom";
import MediaRankingPage from "../components/mediaRankingPage";


const MovieRankPage = (props) => {
  const { media_type } = useParams();

  return (
    <MediaRankingPage media_type={media_type}>
    </MediaRankingPage>
  )
}
export default MovieRankPage;