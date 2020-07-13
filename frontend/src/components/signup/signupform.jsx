import React, { Component } from "react";
import axios from "axios";
import validator from "email-validator";
import "./signup.css";

import { Redirect } from "react-router-dom";

class SignupForm extends Component {
  state = {
    email: "",
    first: "",
    last: "",
    user: "",
    pass: "",
    check1: "",
    check2: undefined,
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleSubmit = () => {
    let data = {
      account: [
        this.state.email,
        this.state.first,
        this.state.last,
        this.state.user,
        this.state.pass,
      ],
    };
    if (
      this.state.email.length < 4 ||
      this.state.first.length === 0 ||
      this.state.last.length === 0 ||
      this.state.user.length === 0 ||
      this.state.pass.length === 0
    )
      return console.log("One or more fields is missing");

    if (validator.validate(this.state.email) === false) {
      console.log("Please enter a valid email address!");
    } else {
      axios
        .post("/api/adduser", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(result => {
          this.setState({ check1: result.data });
          const datas = {
            account: [this.state.email, this.state.pass],
          };
          axios
          .post("/api/login", datas, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => this.setState({ check2: response.data }));
        });
      console.log("User submitted - waiting for response");
    }
  };

  render() {
    if (this.state.check2 === true) {
      return <Redirect to="/dashboard" />;
    }
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

export default SignupForm;
