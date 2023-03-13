// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';
import { useContext } from 'react';

// assets
import Google from '../../../assets/images/icons/google.svg';
import Twitter from '../../../assets/images/icons/twitter.svg';
import Facebook from '../../../assets/images/icons/facebook.svg';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, signInWithRedirect } from "firebase/auth";
import userService from '../../../../../api/userService';
import { AuthContext } from '../../../../../context/authContext';
import { auth } from '../../../../../firebase';
import { useNavigate } from 'react-router-dom';

const FirebaseSocial = (props) => {
  const theme = useTheme();
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  // const auth = getAuth();
  const googleLoginHandler = async () => {
    // login || singup
    const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     userService.getByEmail(user.email)
    //       .then((response) => {
    //         console.log(response.data)
    //         context.signIn(response.data)
    //         navigate('/homepage')

    //       })
    //   })

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        userService.getByEmail(user.email)
          .then((response) => {
            console.log(response.data)
            context.signIn(response.data)
            navigate('/homepage')
          })
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const twitterLoginHandler = async () => {
    // login || singup


  };

  const facebookLoginHandler = async () => {
    const provider = new FacebookAuthProvider();
    // signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(result)
        userService.getByEmail(user.email)
          .then((response) => {
            console.log(response.data)
            context.signIn(response.data)
            navigate('/homepage')
          })
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorMessage)
        // ...
      });
  };

  // const googleRegisterHandler = async () => {
  //   // login || singup
  // };

  // const twitterRegisterHandler = async () => {
  //   // login || singup
  // };

  // const facebookRegisterHandler = async () => {
  //   // login || singup
  // };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="primary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleLoginHandler}
      // onClick={props.action === 'login' ? googleLoginHandler : googleRegisterHandler}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Twitter} alt="Twitter" />}
        onClick={twitterLoginHandler}
      // onClick={props.action === 'login' ? twitterLoginHandler : twitterRegisterHandler}
      >
        {!matchDownSM && 'Twitter'}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookLoginHandler}
      // onClick={props.action === 'login' ? facebookLoginHandler : facebookRegisterHandler}
      >
        {!matchDownSM && 'Facebook'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
