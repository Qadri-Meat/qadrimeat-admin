import AllDealsPage from './AllDealsPage';
import AddDealPage from './AddDealPage';
import UpdateDealPage from './UpdateDealPage';

export const DealsPageConfig = {
  routes: [
    {
      path: '/deals',
      exact: true,
      component: AllDealsPage,
    },
    {
      path: '/deals/add-deal',
      exact: true,
      component: AddDealPage,
    },
    {
      path: '/deals/:id',
      exact: true,
      component: UpdateDealPage,
    },
  ],
};
