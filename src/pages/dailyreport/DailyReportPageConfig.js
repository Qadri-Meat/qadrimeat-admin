import AddStockPage from "./AddStockPage";
import CheckStock from "./CheckStock";
export const DailyReportPageConfig = {
  routes: [
    {
      path: "/addstock",
      exact: true,
      element: <AddStockPage />,
    },
    {
      path: "/checkstock",
      exact: true,
      element: <CheckStock />,
    },
  ],
};
