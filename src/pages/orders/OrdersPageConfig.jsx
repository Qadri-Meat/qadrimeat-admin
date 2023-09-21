import AddOrderPage from "./AddOrderPage";
import AllOrderPage from "./AllOrderPage";
import InvoicePage from "./InvoicePage";
import OrderPage from "./OrderPage";

export const OrderPageConfig = {
  routes: [
    {
      path: "/orders",
      exact: true,
      element: <AllOrderPage />,
    },
    {
      path: "/orders/add-order",
      exact: true,
      element: <AddOrderPage />,
    },
    {
      path: "/orders/invoice/:id",
      element: <InvoicePage />,
    },

    {
      path: "/orders/:id",
      element: <OrderPage />,
    },
    {
      path: "/orders/invoice/:id",
      exact: true,
      element: <InvoicePage />,
    },
  ],
};
