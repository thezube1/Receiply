import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./uploadNav.css";

class UploadManualNav extends Component {
  state = {};

  getLocation = () => {
    let path = window.location.pathname;
    if (window.matchMedia("(max-width: 1080px)").matches === true) {
      if (path === "/dashboard/upload/manual") {
        return -28;
      }
      if (path === "/dashboard/upload/manual/2") {
        return 139;
      }
      if (path === "/dashboard/upload/manual/3") {
        return 305;
      }
      if (path === "/dashboard/upload/manual/4") {
        return 478;
      }
    } else {
      if (path === "/dashboard/upload/manual") {
        return 0;
      }
      if (path === "/dashboard/upload/manual/2") {
        return 230;
      }
      if (path === "/dashboard/upload/manual/3") {
        return 470;
      }
      if (path === "/dashboard/upload/manual/4") {
        return 710;
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div id="uploadManualDash">
          <motion.div
            animate={{ x: this.getLocation() }}
            id="uploadManualDashSelection"
          ></motion.div>
          <div id="uploadManualDashWrapper">
            <Link
              to="/dashboard/upload/manual"
              style={{ textDecoration: "none" }}
            >
              <span className="uploadManualDashText">Step 1</span>
            </Link>
            <Link
              to="/dashboard/upload/manual/2"
              style={{ textDecoration: "none" }}
            >
              <span className="uploadManualDashText">Step 2</span>
            </Link>
            <Link
              to="/dashboard/upload/manual/3"
              style={{ textDecoration: "none" }}
            >
              <span className="uploadManualDashText">Step 3</span>
            </Link>
            <Link
              to="/dashboard/upload/manual/4"
              style={{ textDecoration: "none" }}
            >
              <span className="uploadManualDashText">Step 4</span>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UploadManualNav;
