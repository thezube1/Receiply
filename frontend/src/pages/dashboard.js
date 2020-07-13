import React, { Component } from "react";
import "../components/dashboard/dashboard.css";
import { Switch } from "react-router-dom";
import PrivateRoute from "../privateroute";
import axios from "axios";

import DashHeader from "../components/dashboard/DashHeader";
import DashNotification from "../components/dashboard/DashNotification";
import NavbarMain from "../components/navbar/navbarmain";

import UploadPage from "./upload";
import FamilyPage from "./family";
import CreateFamilyPage from "./createfamily";

class DashboardPage extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("/api/getfamily")
      .then((result) => this.setState({ family: result.data }));
  }

  render() {
    if (this.state.family === false) {
      return <CreateFamilyPage />;
    }
    return (
      <Switch>
        <PrivateRoute path="/dashboard/upload" component={UploadPage} />
        <PrivateRoute path="/dashboard/family" component={FamilyPage} />
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
