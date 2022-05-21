import AllInventoriesPage from './AllInventoriesPage';
import AddInventoryPage from './AddInventoryPage';

export const InventoriesPageConfig = {
  routes: [
    {
      path: '/inventories',
      exact: true,
      component: AllInventoriesPage,
    },
    {
      path: '/inventories/add-inventory',
      exact: true,
      component: AddInventoryPage,
    },
    {
      path: '/inventories/:id',
      exact: true,
      component: AddInventoryPage,
    },
  ],
};
