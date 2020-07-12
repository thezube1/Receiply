import React, { Component } from "react";
import "../components/dashboard/dashboard.css";
import { Link, Switch } from "react-router-dom";
import PrivateRoute from "../privateroute";

import DashHeader from "../components/dashboard/DashHeader";
import DashNotification from "../components/dashboard/DashNotification";
import NavbarMain from "../components/navbar/navbarmain";

import UploadPage from "./upload";

class DashboardPage extends Component {
  state = {};

  render() {
    return (
      <Switch>
        <PrivateRoute path="/dashboard/upload" component={UploadPage} />
        <React.Fragment>
          <div>
            <NavbarMain />
            <div id="dashWrapper">
              <div>
                <DashHeader />
              </div>
              <DashNotification />
              <div id="dashDivider1"></div>
              <div id="dashRecent">Recently Viewed</div>
            </div>
          </div>
        </React.Fragment>
      </Switch>
    );
  }
}

export default DashboardPage;
