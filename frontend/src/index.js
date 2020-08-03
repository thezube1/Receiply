import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./privateroute";
import RouterFork from "./RouteFork";

//pages
import App from "./App";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import PublicUser from "./pages/publicuser";
import InviteRouter from "./pages/inviterouter";
import NotFoundPage from "./pages/404page";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/users/:user" component={PublicUser} />
      <PrivateRoute path="/inviteurl/" component={InviteRouter} />
      <RouterFork Route1={App} Route2={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
