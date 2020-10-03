import React, { Component } from "react";
import "../components/dashboard/dashboard.css";
import NavbarMain from "../components/navbar/navbarmain";
import IndexBar from "../components/indexbar/IndexBar";

import DashPop from "../components/dashboard/DashPop";
import DashFamily from "../components/dashboard/DashFamily";
import DashRecipes from "../components/dashboard/DashRecipes";
import NotVerified from "../components/verify/NotVerified";
import axios from "axios";
import { connect } from "react-redux";

class DashboardPage extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("/api/verify/user")
      .then((res) =>
        res.data === true ? this.props.verify() : this.props.unverify()
      );
  }

  render() {
    console.log(this.props.verified);
    return (
      <React.Fragment>
        {this.props.verified === false ? (
          <NotVerified />
        ) : (
          <React.Fragment></React.Fragment>
        )}
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
        <IndexBar />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verified: state.verify_reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: () => dispatch({ type: "VERIFIED" }),
    unverify: () => dispatch({ type: "UNVERIFIED" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
