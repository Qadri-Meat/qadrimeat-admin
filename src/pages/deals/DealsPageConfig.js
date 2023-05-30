import AddDealPage from "./AddDealPage";
import AllDealsPage from "./AllDealsPage";

export const DealsPageConfig = {
  routes: [
    {
      path: "/deals",
      exact: true,
      element: <AllDealsPage />,
    },
    {
      path: "/deals/add-deal",
      exact: true,
      element: <AddDealPage />,
    },
    {
      path: "/deals/:id",
      element: <AddDealPage />,
    },
  ],
};
