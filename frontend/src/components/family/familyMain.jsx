import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import FamilyInvite from "./FamilyInvite";

class FamilyMain extends Component {
  state = {};

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/getfamily", { cancelToken: this.source.token })
      .then((result) => this.setState({ family: result.data }))
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/dashboard/family/invite" component={FamilyInvite} />
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
