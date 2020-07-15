import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import CreateFamilyPage from "./createfamily";
import FamilyNav from "../components/family/FamilyNav";
import FamilyLinkInvite from "../components/invites/FamilyLinkInvite";
import FamilyMain from "../components/family/familyMain";

import "../components/family/family.css";

class FamilyPage extends Component {
  state = {
    family: "",
  };
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/getfamily", { cancelToken: this.source.token })
      .then((result) => this.setState({ family: result.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  render() {
    if (this.state.family === false) {
      return <CreateFamilyPage />;
    }
    return (
      <React.Fragment>
        <Switch>
          <Route
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
