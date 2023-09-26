import AddStockForm from "./AddStockForm";
import CheckStock from "./CheckStock";
export const DailyReportPageConfig = {
  routes: [
    {
      path: "/addstock",
      exact: true,
      element: <AddStockForm />,
    },
    {
      path: "/checkstock",
      exact: true,
      element: <CheckStock />,
    },
  ],
};
