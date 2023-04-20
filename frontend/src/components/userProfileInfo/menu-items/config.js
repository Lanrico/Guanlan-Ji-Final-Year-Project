// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    SettingOutlined,
    EditOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    SettingOutlined,
    EditOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const config = {
    id: 'configuration',
    title: 'Configuration',
    type: 'group',
    children: [
        {
            id: 'interest-config',
            title: 'Interest config',
            type: 'item',
            url: 'interestConfig',
            icon: icons.EditOutlined
        }
    ]
};

export default config;
