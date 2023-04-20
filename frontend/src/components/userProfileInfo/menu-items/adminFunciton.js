import {
  AlertOutlined,
  AuditOutlined
} from '@ant-design/icons';

const icons = {
  AlertOutlined,
  AuditOutlined
};

const adminFunction = {
  id: 'adminFunction',
  title: 'Admin function',
  type: 'group',
  children: [
    {
      id: 'Check-review',
      title: 'Check review',
      type: 'item',
      url: 'checkReview',
      icon: icons.AlertOutlined
    },
    {
      id: 'Pro-user-Request',
      title: 'Pro user request',
      type: 'item',
      url: 'proUserRequest',
      icon: icons.AuditOutlined
    }
  ]
};

export default adminFunction;