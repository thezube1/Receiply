import React, { Component } from "react";
import Navbar from "./components/navbar/navbar";
import IndexBar from "./components/indexbar/IndexBar";
import "./App.css";
import { initGA, PageView } from "./components/tracking/index";
import { Fade } from "react-reveal";
import UploadImage from "./photos/index/Capture.PNG";

class App extends Component {
  state = {};

  componentDidMount() {
    initGA();
    PageView();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div id="mainpagewrapper">
          <div id="backgroundImage">
            <Fade bottom big>
              <div id="mainTitle">Receiply</div>
            </Fade>
          </div>
          <div id="mainPageSecondWrapper">
            <Fade left>
              <div className="mainHeader" id="mainPageSecondText">
                Sharing recipes with family has never been easier
              </div>
            </Fade>
          </div>
          <div id="mainPageThirdWrapper">
            <div id="mainPageThirdContent">
              <Fade left>
                <div className="mainHeader">Effortlessly upload recipes</div>
              </Fade>
              <Fade right>
                <img
                  src={UploadImage}
                  alt="Upload recipe sample"
                  id="mainImage1"
                />
              </Fade>
            </div>
          </div>
        </div>
        <IndexBar dissapear={900} />
      </React.Fragment>
    );
  }
}

export default App;
