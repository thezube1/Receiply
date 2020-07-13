import React, { Component } from "react";
import axios from "axios";
import PrivateRoute from "../../privateroute";
import { Switch } from "react-router-dom";
import FamilyInvite from "./FamilyInvite";

class FamilyMain extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("/api/getfamily")
      .then((result) => this.setState({ family: result.data }));
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute
            path="/dashboard/family/invite"
            component={FamilyInvite}
          />

          <React.Fragment>
            <div id="familyContentWrapper">
              <div id="familyName">
                You are apart of the family: {this.state.family}
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </React.Fragment>
    );
  }
}

export default FamilyMain;
