import { DashboardPageConfig } from "../pages/dashboard/DashboardPageConfig";
import { UsersPageConfig } from "../pages/users/UsersPageConfig";
import { DealsPageConfig } from "pages/deals/DealsPageConfig";
import { BookingPageConfig } from "pages/bookings/BookingsPageConfig";
import { Error404PageConfig } from "../pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "../pages/errors/500/Error500PageConfig";
import { ProfilePageConfig } from "../pages/profile/ProfilePageConfig";
import { ExpensesPageConfig } from "pages/expenses/ExpensesPageConfig";
import { ProductPageConfig } from "pages/products/ProductPageConfig";
import { OrderPageConfig } from "pages/orders/OrdersPageConfig";
const routeConfigs = [
  ...DashboardPageConfig.routes,
  ...UsersPageConfig.routes,
  ...DealsPageConfig.routes,
  ...BookingPageConfig.routes,
  ...Error404PageConfig.routes,
  ...Error500PageConfig.routes,
  ...ProfilePageConfig.routes,
  ...ExpensesPageConfig.routes,
  ...ProductPageConfig.routes,
  ...OrderPageConfig.routes,
];

const routes = [...routeConfigs];

export default routes;
