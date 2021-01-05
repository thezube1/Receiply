import React, { Component } from "react";
import Navbar from "./components/navbar/navbar";
import IndexBar from "./components/indexbar/IndexBar";
import "./App.css";
import {} from "react-reveal";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div id="mainpagewrapper">
          <div id="backgroundImage">
            <div id="mainTitle">Receiply</div>
          </div>
          <div id="mainPageSecondWrapper">
            <div className="mainHeader">
              Receiply is family recipe sharing made easy
            </div>
          </div>
        </div>
        <IndexBar />
      </React.Fragment>
    );
  }
}

export default App;
