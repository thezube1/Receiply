import React, { Component } from "react";

import "./createfamily.css";
import axios from "axios";

class CreateFamilyForm extends Component {
  state = {
    name: "",
    desc: "",
    url: "",
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleCreate = () => {
    const data = {
      family: [this.state.name, this.state.desc],
    };
    if (this.state.name.length === 0 || this.state.desc.length === 0) {
      console.log("One or more fields is empty");
    } else {
      axios.post("/api/addfamily", data);
    }
  };

  render() {
    return (
      <div id="createFamWrapper">
        <div id="createFamTitle">Create or join a family!</div>
        <div id="createFamSecondWrap">
          <div className="createFamHeader">Create Family</div>
          <div className="createFamDesc">Name of family</div>
          <input
            type="text"
            className="createFamInput"
            value={this.state.name}
            onChange={this.handleChange("name")}
          ></input>
          <div className="createFamDesc">Family description</div>
          <textarea
            type="text"
            className="createFamInput"
            value={this.state.desc}
            onChange={this.handleChange("desc")}
          ></textarea>
          <br />
          <input
            type="submit"
            value="Create"
            className="createFamSubmit"
            onClick={this.handleCreate}
          ></input>
          <div className="createFamHeader">Join Family</div>
          <div className="createFamDesc">Enter invite url</div>
          <textarea
            id="createFamJoin"
            className="createFamInput"
            value={this.state.url}
            onChange={this.handleChange("url")}
          ></textarea>
          <br />
          <input type="submit" value="Join" className="createFamSubmit"></input>
        </div>
      </div>
    );
  }
}

export default CreateFamilyForm;
