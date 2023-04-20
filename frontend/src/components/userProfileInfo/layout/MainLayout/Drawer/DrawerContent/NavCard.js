// material-ui
import { Button, CardMedia, Stack, Typography } from '@mui/material';

// project import
import MainCard from '../../../../components/MainCard.js';
// assets
import avatar from '../../../../../../images/SimpleLogo.png';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import { Link } from 'react-router-dom';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
    <MainCard sx={{ m: 3 }}>
        <Stack alignItems="center" spacing={2.5}>
            <CardMedia component="img" image={avatar} sx={{ width: 112 }} />
            <Stack alignItems="center">
                <Typography variant="h5">ILI Pro</Typography>
                <Typography variant="h6" color="secondary" align='center'>
                    Checkout pro features
                </Typography>
            </Stack>
            <AnimateButton>
                <Button component={Link} to="/user/payment/0" variant="contained" color="primary" size="small">
                    Pro
                </Button>
            </AnimateButton>
        </Stack>
    </MainCard>
);

export default NavCard;
