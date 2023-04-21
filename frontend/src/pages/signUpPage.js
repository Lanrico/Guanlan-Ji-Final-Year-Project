import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import PageTemplate from '../components/pageTemplate';
import Register from '../components/userProfileInfo/pages/authentication/Register';

export default function SignUpPage() {
  const theme = useTheme();

  return (
    <PageTemplate>
      <ThemeProvider theme={theme}>
        <Register></Register>
      </ThemeProvider>
    </PageTemplate>
  );
}