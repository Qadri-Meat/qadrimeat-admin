import DashboardPage from "./DashboardPage";

export const DashboardPageConfig = {
  routes: [
    {
      path: "/",
      exact: "true",
      element: <DashboardPage />,
    },
  ],
};
