// project import
import interest from './interest';
import userProfile from './userProfile';
import config from './config';
import support from './support';
import adminFunction from './adminFunciton';

// ==============================|| MENU ITEMS ||============================== //
const menuItems = {
    adminItem: [adminFunction, userProfile, interest, config, support],
    items: [userProfile, interest, config, support]
};

export default menuItems;
