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
        type: 'collapse',
        icon: 'file_copy',
        badge: {
          title: '2',
          bg: '#525E8A',
          fg: '#FFFFFF',
        },
        children: [
          {
            id: 'all bookings',
            title: 'All Bookings',
            type: 'item',
            url: '/bookings',
            exact: true,
          },
          {
            id: 'booking items',
            title: 'Booking items',
            type: 'item',
            url: '/bookings/booking-items',
            exact: true,
          },
        ],
      },
      {
        id: 'expenses',
        title: 'Expenses',
        type: 'item',
        icon: 'receipt',
        url: '/expenses',
        exact: true,
      },
      {
        id: 'stocks',
        title: 'Stocks',
        type: 'item',
        icon: 'receipt',
        url: '/stocks',
        exact: true,
      },
    ],
  },
];

export default navigationConfig;
