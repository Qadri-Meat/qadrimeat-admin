import AllStocksPage from './AllStocksPage';
import AddStockPage from './AddStockPage';

export const StocksPageConfig = {
  routes: [
    {
      path: '/stocks',
      exact: true,
      component: AllStocksPage,
    },
    {
      path: '/stocks/add-stock',
      exact: true,
      component: AddStockPage,
    },
    {
      path: '/stocks/:id',
      exact: true,
      component: AddStockPage,
    },
  ],
};
