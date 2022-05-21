import React from 'react';
import { Redirect } from 'react-router-dom';

import { DashboardPageConfig } from '../pages/dashboard/DashboardPageConfig';
import { UsersPageConfig } from '../pages/users/UsersPageConfig';
import { ProductsPageConfig } from '../pages/products/ProductsPageConfig';
import { DealsPageConfig } from '../pages/deals/DealsPageConfig';
import { OrdersPageConfig } from '../pages/orders/OrdersPageConfig';
import { BookingsPageConfig } from '../pages/bookings/BookingsPageConfig';
import { ExpensesPageConfig } from '../pages/expenses/ExpensesPageConfig';
import { InventoriesPageConfig } from '../pages/inventories/InventoriesPageConfig';
import { LoginPageConfig } from '../pages/auth/login/LoginPageConfig';
import { Error404PageConfig } from '../pages/errors/404/Error404PageConfig';
import { Error500PageConfig } from '../pages/errors/500/Error500PageConfig';
// import { DocumentationConfig } from "../pages/documentation/DocumentationConfig";

const routeConfigs = [
  ...DashboardPageConfig.routes,
  ...UsersPageConfig.routes,
  ...OrdersPageConfig.routes,
  ...ProductsPageConfig.routes,
  ...DealsPageConfig.routes,
  ...BookingsPageConfig.routes,
  ...ExpensesPageConfig.routes,
  ...InventoriesPageConfig.routes,
  ...LoginPageConfig.routes,
  ...Error404PageConfig.routes,
  ...Error500PageConfig.routes,
];

const routes = [
  ...routeConfigs,
  {
    component: () => <Redirect to="/pages/errors/error-404" />,
  },
  // {
  //   path: "/test",
  //   exact: true,
  //   component: <Example />
  // }
];

export default routes;
