import { TypesLayout } from "../../interface/theme";

export type GetRoutes = "superuser" | "default" | "auth" | string;

export type RoutesInterface = {
  name?: string;
  path: string;
  icon?: string;
  exact: boolean;
  layout: TypesLayout;
  sidebar: boolean;
  component: React.FC;
  redirectTo?: string;
};
export type Routers = {
  auth: RoutesInterface[];
  superuser: RoutesInterface[];
};
