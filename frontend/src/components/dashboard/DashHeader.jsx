import React, { Component } from "react";

class DashHeader extends Component {
  state = {
    name: "Zubin",
  };
  render() {
    return (
      <React.Fragment>
        <div id="welcomeText" className="headerText">
          Welcome back, {this.state.name}
        </div>
        <div id="subwelcomeText" className="headerText">
          Here are some things you
          <br /> might be interested in:
        </div>
        <div id="headerBar"></div>
      </React.Fragment>
    );
  }
}

export default DashHeader;
