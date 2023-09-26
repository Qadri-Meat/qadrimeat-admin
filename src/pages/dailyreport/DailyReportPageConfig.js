import AddStockForm from "./AddStockForm";
export const DailyReportPageConfig = {
  routes: [
    {
      path: "/dailyreport",
      exact: true,
      element: <AddStockForm />,
    },
  ],
};
