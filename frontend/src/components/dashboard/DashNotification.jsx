import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashNotification extends Component {
  state = {
    one: "Sasha joined your family",
    two: "Firdausi uploaded a new recipe",
    three: "Aamer commented on your recipe",
  };
  render() {
    return (
      <React.Fragment>
        <div id="notificationWrapper">
          <div id="notificationHeader">notifications:</div>
          <div className="dashNotificationLine"></div>
          <div className="dashNotificationText">1. {this.state.one}</div>
          <div className="dashNotificationLine"></div>
          <div className="dashNotificationText">2. {this.state.two}</div>
          <div className="dashNotificationLine"></div>
          <div className="dashNotificationText">3. {this.state.three}</div>
          <div className="dashNotificationLine"></div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div id="notificationExpand">View More</div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default DashNotification;
