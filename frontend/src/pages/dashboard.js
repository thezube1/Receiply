import React, { Component } from "react";
import "../components/dashboard/dashboard.css";
import NavbarMain from "../components/navbar/navbarmain";

import DashPop from "../components/dashboard/DashPop";
import DashFamily from "../components/dashboard/DashFamily";
import DashRecipes from "../components/dashboard/DashRecipes";

class DashboardPage extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div id="dashboard">
          <NavbarMain />
          <div id="dashWrapper">
            <div id="dashAreaTop" className="dashArea">
              <DashPop />
            </div>
            <div id="dashAreaBottom" className="dashArea">
              <DashRecipes />
            </div>
            <div id="dashAreaRight" className="dashArea">
              <DashFamily />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardPage;
