// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from '../../../../components/third-party/SimpleBar';
import { Box } from '@mui/material';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <Box>
        <Navigation />
        <NavCard />
    </Box>
);

export default DrawerContent;
