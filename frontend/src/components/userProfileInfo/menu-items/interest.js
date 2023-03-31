// assets
import { LoginOutlined, ProfileOutlined, HistoryOutlined, HeartOutlined, LikeOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    HistoryOutlined,
    HeartOutlined,
    LikeOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const interest = {
    id: 'interest',
    title: 'Interest',
    type: 'group',
    children: [
        {
            id: 'history',
            title: 'History',
            type: 'item',
            url: 'history',
            icon: icons.HistoryOutlined,
        },
        {
            id: 'favourite',
            title: 'Favourite',
            type: 'item',
            url: 'favourite',
            icon: icons.HeartOutlined,
        },
        {
            id: 'recommendation',
            title: 'Recommendation',
            type: 'item',
            url: 'recommendation',
            icon: icons.LikeOutlined,
        }
    ]
};

export default interest;
