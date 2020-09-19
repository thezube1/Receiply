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
    if (this.state.valid === undefined) {
      return <Route exact path="/" component={LoadingPage} />;
    }
    if (this.state.valid === false) {
      return <Route exact path="/" component={this.props.Route1} />;
    } else {
      return <Route exact path="/" component={this.props.Route2} />;
    }
  }
}

export default RouterFork;
