// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";

const navigationConfig = [
  {
    id: 'Main',
    title: '',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'apps',
        url: '/',
        exact: true,
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        icon: 'person',
        url: '/users',
        exact: true,
      },
      {
        id: 'products',
        title: 'Products',
        type: 'item',
        icon: 'inventory',
        url: '/products',
        exact: true,
      },
      {
        id: 'orders',
        title: 'Orders',
        type: 'item',
        icon: 'receipt',
        url: '/orders',
        exact: true,
      },
    ],
  },
];

export default navigationConfig;
