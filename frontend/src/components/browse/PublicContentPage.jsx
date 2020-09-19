import React, { Component } from "react";
import PublicContent from "./PublicContent";
import NavbarSwitch from "../navbar/navbarswitch";

class PublicContentPage extends Component {
  state = {};
  render() {
    return (
      <div id="browseFamilyPageWrapper">
        <NavbarSwitch />
        <div id="browseFamilyPageContent">
          <PublicContent splice1={0} splice2={10000000000} />
        </div>
      </div>
    );
  }
}

export default PublicContentPage;
