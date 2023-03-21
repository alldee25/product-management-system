import adminRoutes from "./admin";
import defaultRoutes from "./default";
import authRoutes from "./auth";
import { Routers, RoutesInterface, GetRoutes } from "./interface/router";

const routers: Routers = {
  auth: authRoutes,
  superuser: adminRoutes,
};

export const getRoutes = (permissions: GetRoutes): RoutesInterface[] => {
  if (permissions === "auth") {
    return [...routers["auth"]];
  } else if (permissions === "superuser") {
    return [...routers[permissions], ...defaultRoutes];
  } else {
    return [...routers["auth"]];
  }
};
export const getMenuSidebar = (permissions: GetRoutes): RoutesInterface[] => {
  const routerPermissions = getRoutes(permissions);
  return routerPermissions.filter((route) => !!route.sidebar);
};
