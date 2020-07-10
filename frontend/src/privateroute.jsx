import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import axios from "axios";

class PrivateRoute extends Component {
  state = {
    authorized: "",
    component: this.props.component,
    route: this.props.route,
  };
  componentDidMount() {
    axios
      .get("/api/authorize")
      .then((result) => this.setState({ authorized: result.data }));
  }
  render() {
    if (this.state.authorized === false) {
      return <Redirect to="/" />;
    }
    return <Route path={this.state.route} component={this.state.component} />;
  }
}

export default PrivateRoute;
