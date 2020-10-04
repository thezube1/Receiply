import React, { Component } from "react";

class SignupStrength extends Component {
  state = {
    show: false,
    color: "rgb(255, 110, 120)",
  };

  passwordStrength = () => {
    switch (this.props.strength) {
      case 0:
        return "Weak";
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very strong";
      default:
        return "Weak";
    }
  };

  render() {
    return (
      <div id="signupStrengthWrapper">
        <progress
          style={{
            MozProgressBar: this.state.color,
          }}
          id="signupStrength"
          value={this.props.strength}
          max="4"
        />
        <div id="signupStrengthText">Strength: {this.passwordStrength()}</div>
      </div>
    );
  }
}

export default SignupStrength;
