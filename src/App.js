import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import routes from "./routes";
import AppTheme from "./screens/shared/containers/AppTheme";

function App() {
  const routesWithLayout = routes.filter((obj) => {
    return obj.layout;
  });
  const routesPathWithLayout = routesWithLayout.map((route) => route.path);

  return (
    <>
      <Switch>
        <Route exact path={routesPathWithLayout}>
          <AppTheme>
            <Route exact path={routesPathWithLayout}>
              {routesWithLayout.map((route) => {
                const { authenticateComponent, ...routeProps } = route;
                const RouteComp = authenticateComponent || Route;
                return <RouteComp {...routeProps} />;
              })}
            </Route>
          </AppTheme>
        </Route>
        {routes.map((route) => {
          const { authenticateComponent, ...routeProps } = route;
          const RouteComp = authenticateComponent || Route;
          return <RouteComp {...routeProps} />;
        })}
        <Redirect to="/404" />
      </Switch>
    </>
  );
}

export default connect()(App);
