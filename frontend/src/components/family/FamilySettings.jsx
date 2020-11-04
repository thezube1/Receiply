import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom"
import SettingsNavbar from "./SettingsNavbar"

import FamilyMainSettings from "./Settings/FamilyMainSettings"

class FamilySettings extends Component {
    state = {  }
    render() { 
        return <React.Fragment>
        <div id="settings">
          <div id="settingsWrapper">
            <SettingsNavbar />
            <Switch>
              <Route path="/family/settings/privacy" component={FamilyMainSettings} />
              <React.Fragment>
                <div id="settingsContent">
                    <div>Stuff</div>
                </div>
              </React.Fragment>
            </Switch>
          </div>
        </div>
      </React.Fragment>
    }
}
 
export default FamilySettings;