import UserPageTemplete from "../components/userProfilePageTemplate";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const UserPage = (props) => {
  const authContext = useContext(AuthContext)
  return (
    <UserPageTemplete user={authContext.userProfile}>

    </UserPageTemplete>
  )
}

export default UserPage;