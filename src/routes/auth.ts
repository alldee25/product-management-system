import { TypesLayout } from "../interface/theme";
import LoginPage from "../pages/login";
import { RoutesInterface } from "./interface/router";
export default [
  {
    path: "/",
    exact: true,
    layout: TypesLayout.none,
    sidebar: false,
    redirectTo: "/login",
  },
  {
    path: "/login",
    exact: true,
    layout: TypesLayout.none,
    sidebar: false,
    component: LoginPage,
  },
  {
    path: "*/*",
    exact: true,
    layout: TypesLayout.none,
    sidebar: false,
    redirectTo: "/login",
  },
] as RoutesInterface[];
