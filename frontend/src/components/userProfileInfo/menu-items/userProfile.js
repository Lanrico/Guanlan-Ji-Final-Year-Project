import { useContext } from 'react';

// assets
import { BarsOutlined } from '@ant-design/icons';

// icons
const icons = {
    BarsOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
const userProfile = {
    id: 'group-UserProfile',
    title: 'Profile',
    type: 'group',
    children: [
        {
            id: 'Profile',
            title: 'My profile',
            type: 'item',
            url: 'profile',
            icon: icons.BarsOutlined,
            breadcrumbs: false
        }
    ]
};

export default userProfile;
