// import { lazy } from "react";
import { RoutesInterface } from "./interface/router";
import { TypesLayout } from "../interface/theme";
import NotFoundPage from "../pages/404";

export default [
  {
    path: "*",
    exact: true,
    layout: TypesLayout.none,
    sidebar: false,
    component: NotFoundPage,
  },
] as unknown as RoutesInterface[];
