import PageTemplate from "../components/pageTemplate";
import AuthLogin from "../components/userProfileInfo/pages/authentication/auth-forms/AuthLogin";
import Login from "../components/userProfileInfo/pages/authentication/Login";


const LoginPage = (props) => {
  return (
    <PageTemplate>
      <Login></Login>
    </PageTemplate>
  )
}

export default LoginPage;