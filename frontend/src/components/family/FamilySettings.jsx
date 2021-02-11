import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SettingsNavbar from "./SettingsNavbar";

import FamilyMainSettings from "./Settings/FamilyMainSettings";
//import FamilyPrivacySettings from "./Settings/FamilyPrivacySettings";
import FamilyPersonalSettings from "./Settings/FamilyPersonalSettings";

class FamilySettings extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="settings">
          <div id="settingsWrapper">
            <SettingsNavbar />
            <Switch>
              {/*
              <Route
                path="/family/settings/privacy"
                component={FamilyPrivacySettings}
              />*/}
              <Route
                path="/family/settings/personal"
                component={FamilyPersonalSettings}
              />
              <React.Fragment>
                <div id="settingsContent">
                  <FamilyMainSettings />
                </div>
              </React.Fragment>
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FamilySettings;
