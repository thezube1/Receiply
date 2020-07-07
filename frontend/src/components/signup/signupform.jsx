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
  render() {
    return (
      <div>
        <div id="formContainer">
          <div id="header">Enter your information to sign up</div>
          <div class="description">Email</div>
          <input type="text" class="input" />
          <div class="description">First name</div>
          <input type="text" class="input" />
          <div class="description">Last name</div>
          <input type="text" class="input" />
          <div class="description">Username</div>
          <input type="text" class="input" />
          <div class="description">Password</div>
          <input type="text" class="input" />
          <br />
          <input type="button" value="Submit" id="submitButton" />
        </div>
      </div>
    );
  }
}

export default SignupForm;
