import React, { Component } from "react";

class FamilyChoice extends Component {
  state = {
    family: this.props.family,
    creator: this.props.creator,
  };
  render() {
    return (
      <div>
        <div id="createFamilyChoiceFamily" className="createFamBoldText">
          {this.state.family}
        </div>
        <div id="createFamilyChoiceCreator" className="createFamThinText">
          Created by: {this.state.creator}
        </div>
      </div>
    );
  }
}

export default FamilyChoice;
