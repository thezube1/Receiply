import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import axios from "axios";
import Loading from "./Loading";

class PrivateRoute extends Component {
  state = {
    authorized: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  componentDidMount() {
    axios
      .get("/api/user/authorize", { cancelToken: this.source.token })
      .then((result) => this.setState({ authorized: result.data }))
      .catch((error) => {
        console.log(error.response);
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }
  render() {
    return this.state.authorized === undefined ? (
      <Loading />
    ) : this.state.authorized === false ? (
      <Redirect to="/login" />
    ) : (
      <Route path={this.props.route} component={this.props.component} />
    );

    /*
    if (this.state.authorized === false) {
      return <Redirect to="/login" />;
    } else {
      return <Route path={this.props.route} component={this.props.component} />;
    }
    
      <Route
        path={this.state.route}
        component={() =>
          this.state.authorized === true ? (
            <DashboardPage />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      */
  }
}

export default PrivateRoute;
