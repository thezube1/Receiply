import React, { Component } from "react";
import "../components/upload/upload.css";
import { Switch, Route, Link } from "react-router-dom";

import UploadPhoto from "../components/upload/uploadPhoto/UploadPhoto";
import NavbarMain from "../components/navbar/navbarmain";

import UploadManualMain from "../components/upload/uploadManualWizard/UploadManualMain";
import UploadManualStraight from "../components/upload/uploadManualStraight/UploadManualStraight";

class UploadPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/dashboard/upload/photo" component={UploadPhoto} />
          <Route
            path="/dashboard/upload/manual/"
            component={UploadManualStraight}
          />
          <React.Fragment>
            <NavbarMain />
            <div id="uploadHubWrapper">
              <div>
                <span className="uploadHubHeader">
                  Choose your upload method
                </span>
              </div>
              <div id="uploadHubLinkWrapper">
                <Link
                  to="/dashboard/upload/photo"
                  style={{ textDecoration: "none" }}
                >
                  <div className="uploadHubLink">From photo</div>
                </Link>
                <Link
                  to="/dashboard/upload/manual/1"
                  style={{ textDecoration: "none" }}
                >
                  <div className="uploadHubLink">Manual entry</div>
                </Link>
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </React.Fragment>
    );
  }
}

export default UploadPage;
