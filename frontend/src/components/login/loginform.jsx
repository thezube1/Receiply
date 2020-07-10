import React, { Component } from "react";
import validator from "email-validator";
import { Redirect } from "react-router";
import axios from "axios";

class LoginForm extends Component {
  state = {
    email: "",
    pass: "",
    check: undefined,
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleSubmit = () => {
    const data = {
      account: [this.state.email, this.state.pass],
    };
    if (this.state.email.length === 0 || this.state.pass.length === 0) {
      console.log("One or more fields is empty");
    } else {
      if (validator.validate(this.state.email) === false) {
        console.log("Please enter a valid email address!");
      } else {
        axios
          .post("/api/login", data, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => this.setState({ check: response.data }));
        console.log("Login request submitted");
      }
    }
  };

  render() {
    if (this.state.check === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div id="formContainer">
          <div id="header">Login to Receiply</div>
          <div className="description">Email</div>
          <input
            type="text"
            className="input"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          <div className="description">Password</div>
          <input
            type="password"
            className="input"
            value={this.state.pass}
            onChange={this.handleChange("pass")}
          />
          <br />
          <input
            type="button"
            value="Submit"
            id="submitButton"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default LoginForm;
