import React, { Component } from "react";

class FamilyChoice extends Component {
  state = {
    family: this.props.family,
    identifier: this.props.identifier,
    creator: this.props.creator,
  };
  render() {
    return (
      <div>
        <div>
          <span id="createFamilyChoiceFamily" className="createFamBoldText">
            {this.state.family}
          </span>
          <span id="createFamilyChoiceIdentifier">{this.state.identifier}</span>
        </div>
        <div id="createFamilyChoiceCreator" className="createFamThinText">
          Created by: {this.state.creator}
        </div>
      </div>
    );
  }
}

export default FamilyChoice;
