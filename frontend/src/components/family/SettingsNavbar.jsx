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
              to="/family/settings"
              className="settingsNavbarItem"
              style={{
                color: this.handleColor("/family/settings"),
                border: this.handleColor("/family/settings"),
              }}
            >
              Main
            </Link>
          </div>
          <div>
            <Link
              to="/family/settings/privacy"
              className="settingsNavbarItem"
              style={{
                color: this.handleColor("/family/settings/privacy"),
                border: this.handleColor("/family/settings/privacy"),
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
