import React, { Component } from "react";
import NavbarSwitch from "../components/navbar/navbarswitch";
import IndexBar from "../components/indexbar/IndexBar";
import "../components/about/about.css";

class AboutPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavbarSwitch />
        <div id="aboutWrapper">About</div>
        <IndexBar />
      </React.Fragment>
    );
  }
}

export default AboutPage;
