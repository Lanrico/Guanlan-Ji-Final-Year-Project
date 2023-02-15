import UserPageTemplete from "../components/userProfilePageTemplate";
import { useParams } from "react-router-dom";
import generalUsers from "../sampleData/generalUsers";
const UserPage = (props) => {
  const user_id = useParams().user_id;
  //用user_id去找user

  return (
    <UserPageTemplete user={generalUsers.users[0]}>

    </UserPageTemplete>
  )
}

export default UserPage;