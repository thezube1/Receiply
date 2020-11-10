import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import LoadingPage from "../../Loading";

import FamilyMemberRequests from "./FamilyMemberRequests";
import FamilyMembers from "../family/FamilyMembers";
import FamilyInvite from "./FamilyInvite";
import FamilySettings from "./FamilySettings";

class FamilyMain extends Component {
  state = {
    family: undefined,
    description: undefined,
    setShow: false,
    show: false,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/family", { cancelToken: this.source.token })
      .then((result) => {
        this.setState({ family: result.data });
      })
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    if (this.state.family === undefined) {
      return <LoadingPage />;
    } else {
      return (
        <React.Fragment>
          <Switch>
            <Route path="/family/invite" component={FamilyInvite} />
            <Route path="/family/members" component={FamilyMembers} />
            <Route path="/family/settings" component={FamilySettings} />
            <React.Fragment>
              <FamilyMemberRequests />
              <div id="familyContentWrapper">
                <div style={{ marginTop: 100 }}>
                  <span className="familyTitle">Family:</span>
                </div>
                <div id="familyName">{this.state.family.FAMILY_NAME}</div>
                <div style={{ marginTop: 40 }}>
                  <span className="familyHeader">Description:</span>
                </div>
                <div id="familyDescription">
                  {this.state.family.DESCRIPTION}
                </div>
              </div>
            </React.Fragment>
          </Switch>
        </React.Fragment>
      );
    }
  }
}

export default FamilyMain;
