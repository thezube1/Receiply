import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import axios from "axios";
import Loading from "./Loading";
import Cookies from "universal-cookie";

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

  redirectCookie = () => {
    const cookies = new Cookies();
    cookies.set("redirect", window.location.pathname, {
      path: "/",
    });
  };

  render() {
    return this.state.authorized === undefined ? (
      <Loading />
    ) : this.state.authorized === false ? (
      <React.Fragment>
        {this.redirectCookie()}
        <Redirect to="/login" />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Route path={this.props.route} component={this.props.component} />
      </React.Fragment>
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
