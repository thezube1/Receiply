import React, { Component } from "react";

class UploadManual1 extends Component {
  state = {
    input: "",
  };

  handleChange = (inputType) => (event) => {
    localStorage.setItem(inputType, event.target.value);
    this.setState({ [inputType]: event.target.value });
  };
  render() {
    return (
      <div>
        <form autocomplete="on">
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange("input")}
          />
        </form>
      </div>
    );
  }
}

export default UploadManual1;
