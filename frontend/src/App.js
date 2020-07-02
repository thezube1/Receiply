import React, { Component } from "react";
import Navbar from "./components/navbar/navbar";
import "./App.css";

import IndexIntroPhoto from "./components/indexintro/indexintrophoto";
import IndexIntroText from "./components/indexintro/indexintrotext";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div id="indexIntro">
          <div>
            <IndexIntroPhoto />
          </div>
          <div>
            <IndexIntroText />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
