import React from "react";
import { Route, Redirect } from "react-router-dom";

import { env } from "../config";
import { isAuthenticated } from "../helpers";

function RedirectWithStatus({ from, to, status }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = status;
        return <Redirect from={from} to={to} />;
      }}
    />
  );
}

function AuthenticatedRouteInLogin(props) {
  if (isAuthenticated()) {
    return <RedirectWithStatus status={200} to={env._HOME_URL} />;
  }
  return <Route {...props} />;
}

function AuthenticatedRoute(props) {
  if (isAuthenticated()) {
    return <Route {...props} />;
  }
  return <RedirectWithStatus status={302} to={env._LOGIN_URL} />;
}

export { RedirectWithStatus, AuthenticatedRouteInLogin, AuthenticatedRoute };
