import React, { Component } from "react";
import axios from "axios";
import { Switch } from "react-router-dom";
import PrivateRoute from "../privateroute";

import CreateFamilyPage from "./createfamily";
import FamilyNav from "../components/family/FamilyNav";

import FamilyInvite from "../components/family/FamilyInvite";

import "../components/family/family.css";

class FamilyPage extends Component {
  state = {
    family: "",
  };

  componentDidMount() {
    axios
      .get("/api/getfamily")
      .then((result) => this.setState({ family: result.data }));
  }

  render() {
    if (this.state.family === false) {
      return <CreateFamilyPage />;
    }
    return (
      <React.Fragment>
        <div id="familyWrapper">
          <div>
            <FamilyNav />
          </div>
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
        </div>
      </React.Fragment>
    );
  }
}

export default FamilyPage;
