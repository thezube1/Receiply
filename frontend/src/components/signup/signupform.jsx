import React, { Component } from "react";
import axios from "axios";
import validator from "email-validator";
import "./signup.css";
import Navbar from "../navbar/navbar";
import zxcvbn from "zxcvbn";
import { Link, Redirect } from "react-router-dom";
import SignupStrength from "./SignupStrength";

class SignupForm extends Component {
  state = {
    email: "",
    first: "",
    last: "",
    user: "",
    pass: "",
    show: "password",
    passCheck: "",
    check1: "",
  };

  handleChange = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  handleSubmit = (e) => {
    e.preventDefault();
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
      return this.setState({ check1: "fieldMissing" });

    if (validator.validate(this.state.email) === false) {
      this.setState({ check1: "unvalidEmail" });
      console.log("Please enter a valid email address!");
    } else if (this.state.pass !== this.state.passCheck) {
      this.setState({ check1: "notPass" });
    } else {
      axios
        .post("/api/user/create", data, {
          headers: {
            "Content-Type": "application/json",
            cancelToken: this.source.token,
          },
        })
        .then((result) => {
          this.setState({ check1: result.data });

          const datas = {
            account: [this.state.email, this.state.pass],
          };
          if (result.data === "badUser" || result.data === "badEmail") {
          } else {
            axios
              .post("/api/user/login", datas, {
                headers: {
                  "Content-Type": "application/json",
                  cancelToken: this.source.token,
                },
              })
              .then((response) => this.setState({ check2: response.data }));
          }
        });
    }
  };

  componentDidMount() {
    document.body.style.backgroundColor = "rgb(136, 228, 138)";
  }

  componentWillUnmount() {
    this.source.cancel();
    document.body.style.backgroundColor = "white";
  }

  render() {
    if (this.state.check1 === true) {
      return (
        <React.Fragment>
          <Redirect to="/" />
        </React.Fragment>
      );
    }
    return (
      <div id="signupBody">
        <Navbar />
        <div id="signupFormWrapper">
          <div id="signupFormContainer">
            <form onSubmit={this.handleSubmit}>
              <div id="signupHeader">Signup</div>
              <div id="signupBar"></div>
              {this.state.check1 === "badUser" ? (
                <div id="loginError">
                  User with that username already exists!
                </div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {this.state.check1 === "badEmail" ? (
                <div id="loginError">
                  Account with email has already been created!
                </div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {this.state.check1 === "unvalidEmail" ? (
                <div id="loginError">Please enter a valid email address</div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {this.state.check1 === "fieldMissing" ? (
                <div id="loginError">One or more fields is missing</div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              {this.state.check1 === "notPass" ? (
                <div id="loginError">Passwords do not match</div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              <div className="signupDescription">Email</div>
              <input
                type="text"
                className="signupInput"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              <div className="signupDescription">First name</div>
              <input
                type="text"
                className="signupInput"
                placeholder="Enter first name"
                value={this.state.first}
                onChange={this.handleChange("first")}
              />
              <div className="signupDescription">Last name</div>
              <input
                type="text"
                className="signupInput"
                placeholder="Enter last name"
                value={this.state.last}
                onChange={this.handleChange("last")}
              />
              <div className="signupDescription">Username</div>
              <input
                type="text"
                className="signupInput"
                placeholder="Enter username"
                value={this.state.user}
                onChange={this.handleChange("user")}
              />
              <div className="signupDescription">Password</div>
              <input
                type={this.state.show}
                className="signupInput"
                placeholder="Enter password"
                value={this.state.pass}
                onChange={this.handleChange("pass")}
                style={{ marginBottom: 1 }}
              />
              <SignupStrength strength={zxcvbn(this.state.pass).score} />
              <div className="signupDescription">Confirm password</div>
              <input
                type={this.state.show}
                className="signupInput"
                placeholder="Confirm password"
                value={this.state.passCheck}
                onChange={(event) =>
                  this.setState({ passCheck: event.target.value })
                }
                style={{ marginBottom: 10 }}
              />
              <div
                className="signupDescription"
                style={{ display: "flex", gap: 5, marginBottom: 10 }}
              >
                <input
                  type="checkbox"
                  onClick={() =>
                    this.state.show === "password"
                      ? this.setState({ show: "text" })
                      : this.setState({ show: "password" })
                  }
                />
                Show password
              </div>

              <div style={{ textAlign: "center" }}>
                <input type="submit" value="Submit" id="signupSubmitButton" />
                <div style={{ fontSize: 13, marginTop: 10 }}>
                  <span>Already have an account? </span>
                  <Link
                    to="/login"
                    id="resetPasswordButton"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
