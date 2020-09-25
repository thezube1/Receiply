import React, { Component } from "react";
import { Link } from "react-router-dom";

class SettingsNavbar extends Component {
  state = {};

  handleColor = (url) => {
    return window.location.pathname === url ? "rgb(0, 184, 240)" : "black";
  };

  render() {
    return (
      <div id="settingsNavbarWrapper">
        <div>
          <div>
            <Link
              to="/settings"
              className="settingsNavbarItem"
              style={{
                color: this.handleColor("/settings"),
                border: this.handleColor("/settings/privacy"),
              }}
            >
              Account
            </Link>
          </div>
          <div>
            <Link
              to="/settings/privacy"
              className="settingsNavbarItem"
              style={{
                color: this.handleColor("/settings/privacy"),
                border: this.handleColor("/settings/privacy"),
              }}
            >
              Privacy
            </Link>
          </div>
        </div>
        <div id="settingsSeperator"></div>
      </div>
    );
  }
}

export default SettingsNavbar;
