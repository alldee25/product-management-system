import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getRoutes, getMenuSidebar } from "./index";
import {
  useAuthContextDispatch,
  useAuthContextState,
} from "../context/Auth/store";
import DefaultLayout from "../layout/DefaultLayout";
import MainLayout from "../layout/MainLayout";
import { TypesLayout } from "../interface/theme";
import { RoutesInterface } from "../interface";
import { isTokenExpired } from "../utils/utiles";

function RenderRoute() {
  const { userInfo, auth, token } = useAuthContextState();
  const { _signOut } = useAuthContextDispatch();
  const _authRouters = getRoutes("auth");
  const routers = getRoutes(userInfo?.role);
  const menuSidebar = getMenuSidebar(userInfo?.role);
  React.useEffect(() => {
    if (isTokenExpired(token.accesstoken)) {
      _signOut();
    }
  }, []);
  return (
    <Switch>
      {!auth &&
        _authRouters.map((route) =>
          !route.redirectTo ? (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ) : (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={() => (
                <Redirect
                  to={{
                    pathname: route.redirectTo,
                    state: { from: route.path },
                  }}
                />
              )}
            />
          )
        )}
      {auth &&
        routers.map((route) =>
          route.layout === TypesLayout.none ? (
            !!route.redirectTo ? (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={() => (
                  <Redirect
                    to={{
                      pathname: route.redirectTo,
                      state: { from: route.path },
                    }}
                  />
                )}
              />
            ) : (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            )
          ) : (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={() =>
                route.layout === TypesLayout.main ? (
                  <MainLayout router={routers} sidebar={menuSidebar} />
                ) : (
                  <DefaultLayout router={routers} />
                )
              }
            />
          )
        )}
    </Switch>
  );
}
export default React.memo(RenderRoute);
export const RenderLayoutRoute = ({
  router,
}: {
  router: RoutesInterface[];
}) => {
  return (
    <Switch>
      {router.map((route) =>
        !!route.redirectTo ? (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={() => (
              <Redirect
                to={{ pathname: route.redirectTo, state: { from: route.path } }}
              />
            )}
          />
        ) : (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        )
      )}
    </Switch>
  );
};
