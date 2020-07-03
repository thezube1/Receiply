import React, { Component } from "react";
import photo from "../../photos/index/Redone2.jpg";
import "./indexintro.css";

class IndexIntroPhoto extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="photowrapper">
          <img src={photo} id="photo" alt="Father and son" />
        </div>
        <div id="barwrapper">
          <div class="bars"></div>
          <div class="bars"></div>
          <div class="bars"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default IndexIntroPhoto;
