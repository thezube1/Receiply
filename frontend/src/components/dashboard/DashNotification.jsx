import React, { Component } from "react";

class DashNotification extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="notificationHeader">notifications:</div>
        <div class="dashNotificationLine"></div>
        <div class="dashNotificationText">Text</div>
        <div class="dashNotificationLine"></div>
        <div class="dashNotificationText">Text</div>
        <div class="dashNotificationLine"></div>
        <div class="dashNotificationText">Text</div>
        <div class="dashNotificationLine"></div>
      </React.Fragment>
    );
  }
}

export default DashNotification;
