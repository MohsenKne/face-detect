import Login from "../screens/Login/containers/Login";
import NotFound from "../screens/shared/containers/NotFound";
import RollCall from "../screens/RollCall/containers/RollCall";
import Capture from "../screens/Capture/containers/Capture";
import Dashboard from "../screens/Dashboard/containers/Dashboard";

import { AuthenticatedRoute, AuthenticatedRouteInLogin } from "./router";

const routes = [
  {
    authenticateComponent: AuthenticatedRouteInLogin,
    key: "5cddf533-33bd-4588-8cfd-5cc33998f65f",
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    authenticateComponent: null,
    key: "24bf69ab-4f00-416e-8a12-3b4e1ad0f053",
    path: "/404",
    exact: true,
    component: NotFound,
    layout: true,
  },
  {
    authenticateComponent: AuthenticatedRoute,
    key: "24bf69ab-4f00-416e-8a12-3b4e1ad0f068",
    path: "/rollcall",
    exact: true,
    component: RollCall,
    layout: true,
  },
  {
    authenticateComponent: AuthenticatedRoute,
    key: "24bf69ab-4f00-416e-8a12-3b4e1ad0f058",
    path: "/capture",
    exact: true,
    component: Capture,
    layout: true,
  },
  {
    authenticateComponent: AuthenticatedRoute,
    key: "24bf69ab-4f00-416e-8a12-3b4e1ad0f059",
    path: "/",
    exact: true,
    component: Dashboard,
    layout: true,
  },
];

export default routes;
