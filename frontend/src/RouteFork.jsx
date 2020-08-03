import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
class TestComponent extends Component {
  state = {
    valid: false,
  };

  componentDidMount() {
    axios
      .get("/api/authorize")
      .then((response) => this.setState({ valid: response.data }));
  }

  render() {
    if (this.state.valid === false) {
      return <Route exact path="/" component={this.props.Route1} />;
    } else {
      return <Route exact path="/" component={this.props.Route2} />;
    }
  }
}

export default TestComponent;
