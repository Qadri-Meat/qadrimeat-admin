import AddOrderPage from './AddOrderPage';
import AllOrderPage from './AllOrderPage';
import OrderPage from './OrderPage';
import ReceiptPage from './ReceiptPage';

export const OrderPageConfig = {
  routes: [
    {
      path: '/orders',
      exact: true,
      element: <AllOrderPage />,
    },
    {
      path: '/orders/details/:id',
      element: <OrderPage />,
    },
    {
      path: '/orders/invoice/:id',
      element: <ReceiptPage />,
    },
    {
      path: '/orders/:id',
      exact: true,
      element: <AddOrderPage />,
    },
  ],
};
