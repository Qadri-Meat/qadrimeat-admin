import AddOrderPage from './AddOrderPage';
import AllOrdersPage from './AllOrdersPage';
import InvoicePage from './InvoicePage';

import OrderPage from './OrderPage';
import ReceiptPage from './ReceiptPage';
import UpdateOrderPage from './UpdateOrderPage';

export const OrdersPageConfig = {
  routes: [
    {
      path: '/orders',
      exact: true,
      component: AllOrdersPage,
    },
    {
      path: '/orders/add-order',
      exact: true,
      component: AddOrderPage,
    },
    {
      path: '/orders/update-order/:id',
      exact: true,
      component: UpdateOrderPage,
    },
    {
      path: '/orders/invoice/:id',
      exact: true,
      component: InvoicePage,
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
    {
      path: '/orders/receipt/:id',
      exact: true,
      component: ReceiptPage,
    },
  ],
};
