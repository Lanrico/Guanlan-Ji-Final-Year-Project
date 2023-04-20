// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from '../../../../../menu-items';
import { useContext } from 'react';
import { AuthContext } from '../../../../../../../context/authContext';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    const authContext = useContext(AuthContext);
    console.log(authContext.userProfile.type);
    const items = authContext.userProfile.type === 2 ? menuItem.adminItem : menuItem.items;
    const navGroups = items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
