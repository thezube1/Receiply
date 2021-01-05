import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateroute";
import RouterFork from "./RouteFork";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

//pages
import App from "./App";
import PrivacyPolicyPage from "./pages/privacypolicy";
import SignupPage from "./pages/signup";
import EditPage from "./pages/edit";
import ContactPage from "./pages/contact";
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
import VerifyAccountPage from "./pages/verifyaccount";
import NotFoundPage from "./pages/404page";
import ResetPage from "./pages/reset";
import AboutPage from "./pages/about";
import Loading from "./Loading";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <Switch>
          <Route path="/signup" component={SignupPage} />
          <Route path="/loading" component={Loading} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route exact path="/reset/:reset" component={ResetPage} />
          <Route exact path="/verify/:verify" component={VerifyAccountPage} />
          <PrivateRoute path="/inviteurl/" component={InviteRouter} />
          <PrivateRoute path="/upload" component={UploadPage} />
          <PrivateRoute path="/family" component={FamilyPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PrivateRoute path="/myrecipes" component={MyRecipesPage} />
          <Route path="/user/:user" component={PublicUser} />
          <Route exact path="/:recipe/:recipeid" component={RecipePage} />
          <Route exact path="/:recipe/:recipeid/edit" component={EditPage} />
          <RouterFork Route1={App} Route2={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
