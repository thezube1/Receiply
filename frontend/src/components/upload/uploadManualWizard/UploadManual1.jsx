import React, { Component } from "react";

class UploadManual1 extends Component {
  state = {
    input: "",
  };

  handleChange = (inputType) => (event) => {
    localStorage.setItem(inputType, event.target.value);
    this.setState({ [inputType]: event.target.value });
  };

  getChanges = (inputType) => {
    return localStorage.getItem(inputType);
  };
  render() {
    return (
      <div id="uploadManual1Wrapper">
        <div>
          <div className="uploadManualHeader">Name of Recipe:</div>
          <textarea
            id="uploadManualRecipeName"
            className="uploadManualRecipeInput"
            type="text"
            defaultValue={this.getChanges("recipeName")}
            onChange={this.handleChange("recipeName")}
          />
        </div>
        <div>
          <div className="uploadManualHeader">Creator(s):</div>
          <textarea
            className="uploadManualRecipeInput"
            type="text"
            defaultValue={this.getChanges("recipeCreator")}
            onChange={this.handleChange("recipeCreator")}
          />
        </div>
        <div>
          <div className="uploadManualHeader">Description:</div>
          <textarea
            className="uploadManualRecipeInput"
            id="uploadManualRecipeDescription"
            type="text"
            defaultValue={this.getChanges("recipeDescription")}
            onChange={this.handleChange("recipeDescription")}
          />
        </div>
      </div>
    );
  }
}

export default UploadManual1;
