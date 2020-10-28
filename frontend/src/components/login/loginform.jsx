import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "./login.css";
import Navbar from "../navbar/navbar";
import ResetPassword from "../resetPassword/ResetPassword";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  state = {
    email: "",
    pass: "",
    check: undefined,
    error: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleSubmit = () => {
    const data = {
      account: [this.state.email, this.state.pass],
    };
    if (this.state.email.length === 0 || this.state.pass.length === 0) {
      this.setState({ error: "fields" });
      console.log("One or more fields is empty");
    } else {
      axios
        .post("/api/user/login", data, {
          headers: {
            "Content-Type": "application/json",
            cancelToken: this.source.token,
          },
        })
        .then((response) => this.setState({ check: response.data }));
      console.log("Login request submitted");
    }
  };

  componentWillUnmount() {
    this.source.cancel();
  }

  handleError = () => {
    if (this.state.check === "badpass") {
      return <div id="loginError">Incorrect password</div>;
    } else if (this.state.check === "badUser") {
      return <div id="loginError">User not found!</div>;
    } else {
      switch (this.state.error) {
        case "email":
          return <div id="loginError">Please enter a valid email</div>;
        case "fields":
          return <div id="loginError">One or more fields is empty</div>;
        default:
      }
    }
  };

  render() {
    if (this.state.check === true) {
      return <Redirect to="/" />;
    }

    return (
      <div id="loginBody" className="mainColor">
        <Navbar />
        <div id="loginFormWrapper">
          <div id="loginFormContainer">
            <div id="loginHeader">Login</div>
            <div id="loginBar"></div>
            {this.handleError()}
            <div className="loginDescription">Email or username</div>
            <input
              type="text"
              className="loginInput"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />

            <div className="loginDescription">Password</div>
            <input
              type="password"
              className="loginInput"
              placeholder="Enter password"
              value={this.state.pass}
              onChange={this.handleChange("pass")}
              style={{ marginBottom: 10 }}
            />

            <ResetPassword />
            <div style={{ textAlign: "center" }}>
              <input
                type="button"
                value="Login"
                id="loginSubmitButton"
                onClick={this.handleSubmit}
                className="mainColor"
              />
              <div style={{ fontSize: 13, marginTop: 10 }}>
                <span>Don't have an account? </span>
                <Link
                  to="/signup"
                  id="resetPasswordButton"
                  style={{ textDecoration: "none" }}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
