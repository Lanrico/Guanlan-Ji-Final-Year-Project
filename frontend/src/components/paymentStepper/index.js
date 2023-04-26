import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { CircularProgress, FormHelperText, Grid, Input, InputLabel, Link, OutlinedInput } from '@mui/material';
import { Stack } from '@mui/system';
import { AuthContext } from '../../context/authContext';
import { storage } from '../../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import Stripe from '../stripe';
import { useNavigate, useParams } from 'react-router-dom';
import HCaptchaBlock from '../hCaptchaBlock';
import proUserRequestService from '../../api/proUserRequestService';

const steps = ['Describe your job', 'Submit your identification', 'Make payment'];

export default function PaymentStepper() {
  // const params = useParams();

  const { step } = useParams();
  const [activeStep, setActiveStep] = React.useState(parseInt(step));
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [upLoading, setUpLoading] = React.useState(false);
  const [upLoadSuccess, setUpLoadSuccess] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [job, setJob] = React.useState('');
  const [describe, setDescribe] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    // const storedAuthToken = localStorage.getItem('authToken');
    // console.log(storedAuthToken)
    const storedUserProfile = sessionStorage.getItem('userProfile') ? sessionStorage.getItem('userProfile') : localStorage.getItem('userProfile');
    const initialUserProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;

    const searchParams = new URLSearchParams(window.location.search);
    const redirectStatus = searchParams.get('redirect_status');

    console.log(redirectStatus);
    if (redirectStatus === "succeeded") {
      console.log(initialUserProfile)
      const proInfro = localStorage.getItem('proRequest') ? JSON.parse(localStorage.getItem('proRequest')) : null;
      if (proInfro) {
        console.log(proInfro)
        proUserRequestService.create(initialUserProfile.id, {
          company: proInfro.company,
          job: proInfro.job,
          description: proInfro.description,
          time: new Date()
        })
      }
      else {
        console.log("no pro info")
      }
    }


  }, [authContext])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleGetCaptchaToken = (token) => {
    setCaptchaToken(token);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("File can't be empty")
    }
    else {
      const storageRef = ref(storage, 'identifications/' + authContext.userProfile.id + "." + selectedFile.name.split(".")[1])
      const blob = new Blob([selectedFile]);
      setUpLoading(true)
      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log('Uploaded a identification: identifications/' + authContext.userProfile.id + "." + selectedFile.name.split(".")[1]);
          setUpLoading(false)
          setUpLoadSuccess(true)
        })
        .catch((error) => {
          console.error(error);
          setUpLoading(false)
        });
    }
  };


  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleBackToUserProfile = () => {
    var link = "/user/" + authContext.userProfile.id + "/profile";
    navigate(link)
  }

  return authContext.userProfile.type === 0 ? (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 4, mb: 1 }} textAlign={"left"}>
            All steps completed - Your identification has been submitted for review. Once it is successfully reviewed, you will become our professional user. If it fails, you will receive a full refund of the payment made.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', pt: 2 }}>
            <Button onClick={handleBackToUserProfile}>Back to user profile</Button>
          </Box>
        </React.Fragment>
      ) :
        activeStep === 0 ? (

          //Step 1
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Formik
              initialValues={{
                company: '',
                job: '',
                jobDescription: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                company: Yup.string().max(255).required('Your company is required'),
                job: Yup.string().max(255).required('Your job is required'),
                jobDescription: Yup.string().max(10000).required('Your description of your job is required')
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  setStatus({ success: false });
                  setSubmitting(false);
                  console.log(values);
                  handleNext();
                  setJob(values.job);
                  setCompany(values.company);
                  setDescribe(values.jobDescription);
                  localStorage.setItem("proRequest", JSON.stringify({
                    company: values.company,
                    job: values.job,
                    description: values.jobDescription,
                  }));
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
                        <InputLabel htmlFor="company">Your company</InputLabel>
                        <OutlinedInput
                          id="company"
                          type="company"
                          value={values.company}
                          name="company"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your company's full name"
                          fullWidth
                          error={Boolean(touched.company && errors.company)}
                          size="small"
                        />
                        {touched.company && errors.company && (
                          <FormHelperText error id="standard-weight-helper-text-company">
                            {errors.company}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="job">Your job</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.job && errors.job)}
                          id="job"
                          value={values.job}
                          name="job"
                          onBlur={handleBlur}
                          size="small"
                          onChange={handleChange}
                          placeholder="Enter the full name of your job"
                        />
                        {touched.job && errors.job && (
                          <FormHelperText error id="standard-weight-helper-text-job">
                            {errors.job}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="jobDescription">Describe your job</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.jobDescription && errors.jobDescription)}
                          id="jobDescription"
                          value={values.jobDescription}
                          name="jobDescription"
                          onBlur={handleBlur}
                          size="small"
                          onChange={handleChange}
                          placeholder="Write a brief description of your job responsibilities."
                          multiline
                          minRows={2}
                        />
                        {touched.jobDescription && errors.jobDescription && (
                          <FormHelperText error id="standard-weight-helper-text-jobDescription">
                            {errors.jobDescription}
                          </FormHelperText>
                        )}
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
                  </Grid>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}

                    <Button type="submit" disabled={values.company === '' || values.job === '' || values.jobDescription === '' || !captchaToken}>
                      {'Next'}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </React.Fragment>
        ) :
          activeStep === 1 ? (

            //Step 2
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              <Typography>Upload materials to verify your identity</Typography>
              <Box>
                <Input type="file" fullWidth onChange={handleFileChange} inputProps={{ accept: '.pdf' }}></Input>
              </Box>
              <Button onClick={handleUpload} fullWidth>Upload</Button>
              <FormHelperText>
                Your materials will be kept secure and will not be disclosed to any third-party organizations.
              </FormHelperText>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                {upLoading ?
                  <CircularProgress />
                  :
                  <Button onClick={handleNext} disabled={!selectedFile || !upLoadSuccess}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                }
              </Box>
            </React.Fragment>
          ) : (

            //Step 3
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              {/* <Link href={"https://buy.stripe.com/test_4gw9B054Lcob4rmbII"} >Make payment</Link> */}
              <Stripe></Stripe>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                {/* <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button> */}
              </Box>
            </React.Fragment>
          )}
    </Box>
  ) : (
    <Box width={"100%"} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography>Your are not a general user</Typography>
      <Button onClick={e => { navigate("/user/" + authContext.userProfile.id + "/profile") }}>Back</Button>
    </Box>
  );
}