// project import
import { useContext } from 'react';
import NavCard from './NavCard';
import Navigation from './Navigation';
import { Box } from '@mui/material';
import { AuthContext } from '../../../../../../context/authContext';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const authContext = useContext(AuthContext);
  return (
    <Box>
      <Navigation />
      {
        authContext.userProfile.type === 0 ? <NavCard /> : null
      }
    </Box>
  );
}


export default DrawerContent;
