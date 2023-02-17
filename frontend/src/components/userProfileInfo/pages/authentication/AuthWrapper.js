import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
// import Logo from '../../components/Logo';
import AuthFooter from '../../components/cards/AuthFooter';
import miku from '../../../../images/miku_double.png'
// assets
import AuthBackground from '../../assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: 'calc(100vh - 160px)' }}>
    <AuthBackground />
    <Grid Grid
      container
      direction="column"
      justifyContent="flex-end"
    // sx={{
    //   minHeight: '100vh'
    // }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 160px)', md: 'calc(100vh - 160px)' } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box >
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
