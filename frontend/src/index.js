import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./privateroute";

//pages
import App from "./App";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import InviteRouter from "./pages/inviterouter";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/dashboard" component={DashboardPage} />
      <PrivateRoute path="/inviteurl/" component={InviteRouter} />
      <Route exact path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
