import { useParams } from "react-router-dom";
import MediaSearchPage from "../components/mediaSearchPage";


const MovieSearchPage = (props) => {
  const { media_type } = useParams();

  return (
    <MediaSearchPage media_type={media_type}>
    </MediaSearchPage>
  )
}
export default MovieSearchPage;