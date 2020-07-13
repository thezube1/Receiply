import React, { Component } from "react";
import axios from "axios";
import { Switch } from "react-router-dom";
import PrivateRoute from "../privateroute";

import CreateFamilyPage from "./createfamily";
import FamilyNav from "../components/family/FamilyNav";
import FamilyLinkInvite from "../components/invites/FamilyLinkInvite";
import FamilyMain from "../components/family/familyMain";

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
        <Switch>
          <PrivateRoute
            path="/dashboard/family/inviteurl/:familyID"
            component={FamilyLinkInvite}
          />

          <React.Fragment>
            <div id="familyWrapper">
              <div>
                <FamilyNav />
              </div>
              <div>
                <FamilyMain />
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </React.Fragment>
    );
  }
}

export default FamilyPage;
