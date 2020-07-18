import React, { Component } from "react";
import { Link } from "react-router-dom";

class UploadNavButtons extends Component {
  state = {};

  handleBack = () => {
    const path = window.location.pathname;
    if (
      path === "/dashboard/upload/manual/2" ||
      path === "/dashboard/upload/manual"
    ) {
      return "/dashboard/upload/manual";
    } else {
      const step = path.substring(25, 26);
      return (step - 1).toString();
    }
  };

  handleNext = () => {
    const path = window.location.pathname;
    if (path === "/dashboard/upload/manual/4") {
      return "4";
    }
    if (path === "/dashboard/upload/manual") {
      return "manual/2";
    } else {
      const step = path.substring(25, 26);
      let next = parseInt(step) + 1;
      return next.toString();
    }
  };
  render() {
    return (
      <div id="uploadManualButtonWrapper">
        <Link to={this.handleBack()} style={{ textDecoration: "none" }}>
          <span className="UploadManualButton">Back</span>
        </Link>
        <Link to={this.handleNext()} style={{ textDecoration: "none" }}>
          <span className="UploadManualButton">Next</span>
        </Link>
      </div>
    );
  }
}

export default UploadNavButtons;
