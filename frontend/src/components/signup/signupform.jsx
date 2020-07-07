import React, { Component } from "react";

import "./signup.css";

class SignupForm extends Component {
  state = {
    email: "",
    first: "",
    last: "",
    user: "",
    pass: "",
  };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <div>
        <div id="formContainer">
          <div id="header">Enter your information to sign up</div>
          <div className="description">Email</div>
          <input
            type="text"
            className="input"
            value={this.state.email}
            onChange={this.handleEmail}
          />
          <div className="description">First name</div>
          <input type="text" className="input" />
          <div className="description">Last name</div>
          <input type="text" className="input" />
          <div className="description">Username</div>
          <input type="text" className="input" />
          <div className="description">Password</div>
          <input type="text" className="input" />
          <br />
          <input type="button" value="Submit" id="submitButton" />
        </div>
      </div>
    );
  }
}

export default SignupForm;
