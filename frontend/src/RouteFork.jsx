import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import LoadingPage from "./Loading";
class RouterFork extends Component {
  state = {
    valid: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  componentDidMount() {
    axios
      .get("/api/user/authorize", { cancelToken: this.source.token })
      .then((response) => this.setState({ valid: response.data }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    return this.state.valid === undefined ? (
      <Route exact path="/" component={LoadingPage} />
    ) : this.state.valid === false ? (
      <Route exact path="/" component={this.props.Route1} />
    ) : (
      <Route exact path="/" component={this.props.Route2} />
    );
  }
}

export default RouterFork;
