import AllStockPage from "./AllStockPage";
import AddStockPage from "./AddStockPage";
export const StocksPageConfig = {
  routes: [
    {
      path: "/stocks",
      exact: true,
      element: <AllStockPage />,
    },
    {
      path: "/stock/:id",
      exact: true,
      element: <AddStockPage />,
    },
  ],
};
