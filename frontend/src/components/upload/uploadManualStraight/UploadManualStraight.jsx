import React, { Component } from "react";
import "./uploadStraight.css";

import NavbarMain from "../../navbar/navbarmain";

class UploadManualStraight extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavbarMain />
        <div id="uploadStraightContent">
          <div id="uploadStraightWrapper">
            <div id="uploadStraightTitle">Upload recipe</div>
            <div className="uploadStraightHeader" id="uploadStraightFirst">
              Upload photo:
            </div>
            <div>
              <input
                type="button"
                value="select"
                className="uploadStraightButton"
              />
            </div>
            <div className="uploadStraightHeader">*Name of recipe:</div>
            <div>
              <textarea type="text" className="uploadStraightInput" />
            </div>
            <div className="uploadStraightHeader">*Description:</div>
            <div>
              <textarea
                type="text"
                className="uploadStraightInput"
                id="uploadStraightDescription"
              />
            </div>
            <div className="uploadStraightHeader">Ingredients:</div>
            <div>
              <textarea type="text" className="uploadStraightInput" />
            </div>
            <div className="uploadStraightHeader">Prep instructions:</div>
            <div>
              <textarea type="text" className="uploadStraightInput" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadManualStraight;
