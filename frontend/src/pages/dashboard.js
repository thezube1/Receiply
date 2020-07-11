import React, { Component } from "react";
import "../components/dashboard/dashboard.css";

import DashHeader from "../components/dashboard/DashHeader";
import DashNotification from "../components/dashboard/DashNotification";
import NavbarMain from "../components/navbar/navbarmain";

class DashboardPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavbarMain />
        <div id="dashWrapper">
          <div id="dashTopWrapper">
            <div>
              <DashHeader />
            </div>
            <div>
              <DashNotification />
            </div>
          </div>
          <div>Hello!</div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
