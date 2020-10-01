import React, { Component } from "react";

class VerifyAccountPage extends Component {
  state = {};
  render() {
    return <div>{this.props.match.params.verify}</div>;
  }
}

export default VerifyAccountPage;
