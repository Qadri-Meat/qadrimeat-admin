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
        id: 'deals',
        title: 'Deals',
        type: 'item',
        icon: 'inventory',
        url: '/deals',
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
      {
        id: 'bookings',
        title: 'Bookings',
        type: 'item',
        icon: 'receipt',
        url: '/bookings',
        exact: true,
      },
    ],
  },
];

export default navigationConfig;
