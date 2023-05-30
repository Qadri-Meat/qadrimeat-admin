import AddExpensePage from "./AddExpensePage";
import AllExpensesPage from "./AllExpensesPage";
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
