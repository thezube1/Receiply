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
        <div id="aboutWrapper">
          <div id="aboutContent">
            <div className="aboutHeader">About us</div>
            <div className="aboutText">
              Receiply is a recipe sharing website. "Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum."
            </div>
          </div>
        </div>
        <IndexBar />
      </React.Fragment>
    );
  }
}

export default AboutPage;
