import { DashboardPageConfig } from "../pages/dashboard/DashboardPageConfig";
import { UsersPageConfig } from "../pages/users/UsersPageConfig";
import { DealsPageConfig } from "pages/deals/DealsPageConfig";
import { Error404PageConfig } from "../pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "../pages/errors/500/Error500PageConfig";

const routeConfigs = [
  ...DashboardPageConfig.routes,
  ...UsersPageConfig.routes,
  ...DealsPageConfig.routes,
  ...Error404PageConfig.routes,
  ...Error500PageConfig.routes,
];

const routes = [...routeConfigs];

export default routes;
