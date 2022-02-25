import AllOrdersPage from './AllOrdersPage';
import InvoicePage from './InvoicePage';

import OrderPage from './OrderPage';

export const OrdersPageConfig = {
  routes: [
    {
      path: '/orders',
      exact: true,
      component: AllOrdersPage,
    },
    {
      path: '/orders/:id',
      exact: true,
      component: OrderPage,
    },
    {
      path: '/orders/invoice/:id',
      exact: true,
      component: InvoicePage,
    },
  ],
};
