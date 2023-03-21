// import { lazy } from "react";
import { RoutesInterface } from "./interface/router";
import { TypesLayout } from "../interface/theme";
import ProductList from "../pages/product";

export default [
  {
    path: "/",
    exact: true,
    layout: TypesLayout.main,
    sidebar: false,
    redirectTo: "/admin/product",
  },
  {
    name: "Product",
    path: "/admin/product",
    exact: true,
    layout: TypesLayout.main,
    sidebar: true,
    component: ProductList,
  },
] as RoutesInterface[];
