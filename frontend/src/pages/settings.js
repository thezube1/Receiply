import React, { Component } from "react";
import NavbarMain from "../components/navbar/navbarmain";
import "../components/settings/settings.css";
import { Switch, Route } from "react-router-dom";
import SettingsAccount from "../components/settings/SettingsAccount";
import SettingsNavbar from "../components/settings/SettingsNavbar";
import SettingsPrivacy from "../components/settings/SettingsPrivacy";

class SettingsPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavbarMain />
        <div id="settings">
          <div id="settingsWrapper">
            <SettingsNavbar />
            <Switch>
              <Route path="/settings/privacy" component={SettingsPrivacy} />
              <React.Fragment>
                <div id="settingsContent">
                  <SettingsAccount />
                </div>
              </React.Fragment>
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SettingsPage;
