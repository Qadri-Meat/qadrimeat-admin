import AddStockForm from "./AddStockForm";
export const DailyReportPageConfig = {
  routes: [
    {
      path: "/addstock",
      exact: true,
      element: <AddStockForm />,
    },
  ],
};
