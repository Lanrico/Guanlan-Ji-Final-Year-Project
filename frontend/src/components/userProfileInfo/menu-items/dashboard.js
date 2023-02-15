// assets
import { BarsOutlined } from '@ant-design/icons';

// icons
const icons = {
    BarsOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const trending = {
    id: 'group-Trending',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'Trending',
            title: 'Trending',
            type: 'item',
            // url: '/dashboard/default',
            icon: icons.BarsOutlined,
            breadcrumbs: false
        }
    ]
};

export default trending;
