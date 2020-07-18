import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarMain from "../../navbar/navbarmain";

import UploadNavButtons from "../uploadNav/UploadNavButtons";
import UploadManualNav from "../uploadNav/UploadManualNav";

import UploadManual1 from "./UploadManual1";
import UploadManual2 from "./UploadManual2";
import UploadManual3 from "./UploadManual3";
import UploadManual4 from "./UploadManual4";

class UploadManualMain extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavbarMain />
        <div id="uploadManualWrapper">
          <UploadManualNav />
          <div id="uploadManualBar"></div>
          <Switch>
            <Route
              path="/dashboard/upload/manual/2"
              component={UploadManual2}
            />
            <Route
              path="/dashboard/upload/manual/3"
              component={UploadManual3}
            />
            <Route
              path="/dashboard/upload/manual/4"
              component={UploadManual4}
            />
            <Route path="/dashboard/upload/manual" component={UploadManual1} />
          </Switch>
          <UploadNavButtons />
        </div>
      </React.Fragment>
    );
  }
}

export default UploadManualMain;
