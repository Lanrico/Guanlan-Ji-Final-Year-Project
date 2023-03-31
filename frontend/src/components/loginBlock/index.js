import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import Alert from "@mui/material/Alert";

import { AuthContext } from "../../context/authContext";
import userService from "../../api/userService";
import { auth } from "../../firebase";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function LoginBlock() {
  const authContext = useContext(AuthContext);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [userName, setUserName] = useState(authContext.userProfile.name);
  const [rememberMe, setRememberMe] = useState(false);
  const theme = useTheme();
  // const firebaseConfig = {
  //   apiKey: "AIzaSyB_opQz9NSfRrPLhwc9yvckrDv4mSinUxI",
  //   authDomain: "final-year-project-jgl.firebaseapp.com",
  //   projectId: "final-year-project-jgl",
  //   storageBucket: "final-year-project-jgl.appspot.com",
  //   messagingSenderId: "1082745032013",
  //   appId: "1:1082745032013:web:01781659139f87f093fb04",
  //   measurementId: "G-0E0943XPMF"
  // };

  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  const context = useContext(AuthContext);
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setOpenSuccess(true);
        // setUserName(user.email);
        userService.getByEmail(user.email)
          .then((response) => {
            console.log(response.data)
            context.signIn(response.data, data.get('rm'))
          })
        // ...
      })
      .catch((error) => {
        setOpenFail(true);
      });
    event.preventDefault();
  };

  const handleSuccessSnackClose = (event) => {
    setOpenSuccess(false);
  };
  const handleLogout = (event) => {
    context.signOut()
  };
  const handleFailSnackClose = (event) => {
    setOpenFail(false);
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    // '&:hover': {
    //   // backgroundColor: purple[700],
    // },
  }));

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        onClose={handleSuccessSnackClose}
      >
        <Alert
          severity="success"
          onClose={handleSuccessSnackClose}
        >
          <Typography variant="h5">
            Login success
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openFail}
        onClose={handleFailSnackClose}
      >
        <Alert
          severity="error"
          onClose={handleFailSnackClose}
        >
          <Typography variant="h5">
            Invalid email or password
          </Typography>
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs" sx={context.isAuthenticated ? { display: "none" } : null}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value={rememberMe} onClick={handleRememberMe} color="primary" />}
              label="Keep me sign in"
              name="rm"
            />
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 0.5, bgcolor: theme.palette.primary.main }}
            >
              Sign In
            </ColorButton>
            <Grid container>
              <Grid item sx={{ justifyContent: 'center', margin: 'auto' }}>
                <Typography variant="body2">
                  <Link to='/register' style={{ textDecoration: "none", color: theme.palette.primary.main }}>
                    {"Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Container sx={context.isAuthenticated ? null : { display: "none" }} >
        <Typography textAlign={'center'} variant="h4" >
          Welcome,
          <br></br>
          {userName}!
        </Typography>
        <ColorButton
          fullWidth
          onClick={handleLogout}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Logout
        </ColorButton>
      </Container>
    </>
  );
}