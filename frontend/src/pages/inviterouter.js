import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import FamilyLinkInvite from "../components/invites/FamilyLinkInvite";

class InviteRouter extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route path="/inviteurl/:familyID" component={FamilyLinkInvite} />
      </Switch>
    );
  }
}

export default InviteRouter;
