
import { Alert, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Snackbar, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthWrapper from './AuthWrapper';
import AnimateButton from '../../components/@extended/AnimateButton';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { auth } from '../../../../firebase';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
  const [openFail, setOpenFail] = React.useState(false);
  const navigate = useNavigate();

  const handleFailSnackClose = (event) => {
    setOpenFail(false);
  };
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
  return (
    <AuthWrapper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openFail}
        onClose={handleFailSnackClose}
      >
        <Alert
          severity="error"
          onClose={handleFailSnackClose}
        >
          <Typography variant="h5">
            Invalid email
          </Typography>
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="column" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h4">Find Your Account</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              email: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setStatus({ success: false });
                setSubmitting(false);
                console.log(values)
                sendPasswordResetEmail(auth, values.email)
                  .then(() => {
                    alert("Password reset email sent!")
                    navigate("/login")
                    // console.log("Password reset email sent!")
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setOpenFail(true)
                    // ..
                  });
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address to reset your password"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </AnimateButton>
                  <Grid item xs={12} display={'flex'} alignItems={'center'} flexDirection={"column"}>
                    <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                      Back to sign in
                    </Typography>
                  </Grid>
                </Stack>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
};

export default ForgetPassword;
