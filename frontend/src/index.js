import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateroute";
import RouterFork from "./RouteFork";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "./reducers";
import { CookiesProvider } from "react-cookie";

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
import BrowsePage from "./pages/browse";
import MyRecipesPage from "./pages/myrecipes";
import SettingsPage from "./pages/settings";
import NotFoundPage from "./pages/404page";

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({
      latency: 0,
    })
);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/browse" component={BrowsePage} />
          <PrivateRoute path="/inviteurl/" component={InviteRouter} />
          <PrivateRoute path="/upload" component={UploadPage} />
          <PrivateRoute path="/family" component={FamilyPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PrivateRoute path="/myrecipes" component={MyRecipesPage} />
          <Route path="/user/:user" component={PublicUser} />
          <Route exact path="/:recipe/:recipeid" component={RecipePage} />
          <RouterFork Route1={App} Route2={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
