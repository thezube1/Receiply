import React, { Component } from "react";
import axios from "axios";

class VerifyAccountPage extends Component {
  state = {
    user: undefined,
  };

  componentDidMount() {
    axios
      .get("/api/user/current")
      .then((res) => this.setState({ user: res.data }));
  }
  render() {
    return (
      <div>
        {this.props.match.params.verify} {this.state.user}
      </div>
    );
  }
}

export default VerifyAccountPage;
