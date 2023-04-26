import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";

import * as Yup from 'yup';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from "firebase/auth";

import FirebaseSocial from './FirebaseSocial';
import AnimateButton from '../../../components/@extended/AnimateButton';
import userService from '../../../../../api/userService';
import { AuthContext } from '../../../../../context/authContext.js'
import { auth } from '../../../../../firebase';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import HCaptchaBlock from '../../../../hCaptchaBlock';

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleFailSnackClose = (event) => {
    setOpenFail(false);
  };
  const handleGetCaptchaToken = (token) => {
    setCaptchaToken(token);
  };

  return (
    <>
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
            Invalid email or password
          </Typography>
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: checked,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
            console.log(values)
            console.log(captchaToken)
            signInWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                userService.getByEmail(user.email)
                  .then((response) => {
                    context.signIn(response.data, values.rememberMe)
                    console.log("qwqweqweqwe")
                    navigate('/homepage')
                  })
              })
              .catch((error) => {
                console.log(error);
                setOpenFail(true);

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
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end" sx={{ marginRight: 1 }}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        // size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.rememberMe}
                        onChange={handleChange}
                        name="rememberMe"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Typography variant="body1" component={Link} to="/forgetPassword" color="primary" sx={{ textDecoration: 'none' }}>
                    Forgot Password?
                  </Typography>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item sx={{ margin: "auto" }}>
                <HCaptchaBlock getToken={handleGetCaptchaToken} />
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting || !captchaToken}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
                <Grid item xs={12} display={'flex'} alignItems={'center'} flexDirection={"column"}>
                  <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                    Don&apos;t have an account?
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial action={'login'} />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
