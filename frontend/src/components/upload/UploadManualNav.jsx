import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

class UploadManualNav extends Component {
  state = {};

  getLocation = () => {
    let path = window.location.pathname;
    if (path === "/dashboard/upload/manual/") {
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
              to="/dashboard/upload/manual/"
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
