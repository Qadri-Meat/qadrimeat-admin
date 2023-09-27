import AddExpensePage from "./AddStockPage";
import AllExpensesPage from "./AllStockPage";
export const ExpensesPageConfig = {
  routes: [
    {
      path: "/expenses",
      exact: true,
      element: <AllExpensesPage />,
    },
    {
      path: "/expenses/:id",
      exact: true,
      element: <AddExpensePage />,
    },
  ],
};
