import React, { Component } from "react";
import NavbarSwitch from "../components/navbar/navbarswitch";
import IndexBar from "../components/indexbar/IndexBar";
import "../components/about/about.css";

class ContactPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavbarSwitch />
        <div id="aboutWrapper">
          <div id="aboutContent">
            <div className="aboutHeader">Contact</div>
            <div className="aboutText">
              You can contact us at <b>contact@receiply.com</b>
            </div>
          </div>
        </div>
        <IndexBar />
      </React.Fragment>
    );
  }
}

export default ContactPage;
