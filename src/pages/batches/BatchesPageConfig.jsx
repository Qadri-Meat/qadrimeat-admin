import AllBatchesPage from "./AllBatchesPage";
import AddBatchPage from "./AddBatchPage";

export const BatchesPageConfig = {
  routes: [
    {
      path: "/batches",
      exact: "true",
      element: <AllBatchesPage />,
    },
    {
      path: "/batches/:id",
      element: <AddBatchPage />,
    },
  ],
};
