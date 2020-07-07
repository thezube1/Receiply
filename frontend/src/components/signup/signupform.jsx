import React, { Component } from "react";
import axios from "axios";
import "./signup.css";

class SignupForm extends Component {
  state = {
    email: "",
    first: "",
    last: "",
    user: "",
    pass: "",
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  render() {
    console.log(this.state.email, this.state.first);
    return (
      <div>
        <div id="formContainer">
          <div id="header">Enter your information to sign up</div>
          <div className="description">Email</div>
          <input
            type="text"
            className="input"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          <div className="description">First name</div>
          <input
            type="text"
            className="input"
            value={this.state.first}
            onChange={this.handleChange("first")}
          />
          <div className="description">Last name</div>
          <input
            type="text"
            className="input"
            value={this.state.last}
            onChange={this.handleChange("last")}
          />
          <div className="description">Username</div>
          <input
            type="text"
            className="input"
            value={this.state.user}
            onChange={this.handleChange("user")}
          />
          <div className="description">Password</div>
          <input
            type="text"
            className="input"
            value={this.state.pass}
            onChange={this.handleChange("pass")}
          />
          <br />
          <input type="button" value="Submit" id="submitButton" />
        </div>
      </div>
    );
  }
}

export default SignupForm;
