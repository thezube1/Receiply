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
import UploadPage from "./pages/upload";
import FamilyPage from "./pages/family";
import RecipePage from "./pages/recipe";
import SearchPage from "./pages/search";
import NotFoundPage from "./pages/404page";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/search" component={SearchPage} />
      <PrivateRoute path="/inviteurl/" component={InviteRouter} />
      <PrivateRoute path="/upload" component={UploadPage} />
      <PrivateRoute path="/family" component={FamilyPage} />
      <Route path="/users/:user" component={PublicUser} />
      <Route exact path="/:recipe/:recipeid" component={RecipePage} />
      <RouterFork Route1={App} Route2={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
