import React, { Component } from "react";
import FamilyContent from "./FamilyContent";
import NavbarSwitch from "../navbar/navbarswitch";

class FamilyContentPage extends Component {
  state = {};
  render() {
    return (
      <div id="browseFamilyPageWrapper">
        <NavbarSwitch />
        <div id="browseFamilyPageContent">
          <FamilyContent splice1={0} splice2={1000000000} />
        </div>
      </div>
    );
  }
}

export default FamilyContentPage;
