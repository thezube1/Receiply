import React, { Component } from "react";
import "../components/dashboard/dashboard.css";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import DashHeader from "../components/dashboard/DashHeader";
import DashNotification from "../components/dashboard/DashNotification";
import NavbarMain from "../components/navbar/navbarmain";

import UploadPage from "./upload";
import FamilyPage from "./family";
import CreateFamilyPage from "./createfamily";

class DashboardPage extends Component {
  state = {};

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/getfamily", { cancelToken: this.source.token })
      .then((result) => this.setState({ family: result.data }))
      .catch((error) => {
        console.log(error.response);
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }
  render() {
    if (this.state.family === false) {
      return <CreateFamilyPage />;
    }
    return (
      <React.Fragment>
        <Switch>
          <Route path="/dashboard/upload" component={UploadPage} />
          <Route path="/dashboard/family" component={FamilyPage} />
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
      </React.Fragment>
    );
  }
}

export default DashboardPage;
