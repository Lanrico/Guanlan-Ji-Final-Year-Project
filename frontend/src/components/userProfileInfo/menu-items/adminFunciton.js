import {
  AlertOutlined,
  AuditOutlined,
  RetweetOutlined
} from '@ant-design/icons';

const icons = {
  AlertOutlined,
  AuditOutlined,
  RetweetOutlined
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
    },
    {
      id: 'Update-data',
      title: 'Update data',
      type: 'item',
      url: 'updateData',
      icon: icons.RetweetOutlined
    }
  ]
};

export default adminFunction;