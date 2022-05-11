import AllExpensesPage from './AllExpensesPage';
import AddExpensePage from './AddExpensePage';
import UpdateExpensePage from './UpdateExpensePage';

export const ExpensesPageConfig = {
  routes: [
    {
      path: '/expenses',
      exact: true,
      component: AllExpensesPage,
    },
    {
      path: '/expenses/add-expense',
      exact: true,
      component: AddExpensePage,
    },
    {
      path: '/expenses/:id',
      exact: true,
      component: UpdateExpensePage,
    },
  ],
};
