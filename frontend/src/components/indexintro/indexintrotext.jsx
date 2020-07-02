import React, { Component } from "react";

class IndexIntroText extends Component {
  state = {};
  render() {
    return (
      <div id="textWrapper">
        <div id="header">
          <span id="headerText">Welcome to Receiply</span>
        </div>
        <div id="subtitle">Family recipe sharing made easy</div>
      </div>
    );
  }
}

export default IndexIntroText;
