import React, { Component } from "react";
import "./components/loading/loading.css";

class LoadingPage extends Component {
  state = {};
  render() {
    return (
      <div id="loadingWrapper">
        <div id="loadingWheelWrapper">
          <div id="loadingWheel"></div>
        </div>
      </div>
    );
  }
}

export default LoadingPage;
