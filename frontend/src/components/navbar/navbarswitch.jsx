import React, { Component } from "react";
import axios from "axios";

import Navbar from "./navbar";
import NavbarMain from "./navbarmain";

class NavbarSwitch extends Component {
  state = {
    valid: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  componentDidMount() {
    axios
      .get("/api/authorize", { cancelToken: this.source.token })
      .then((response) => this.setState({ valid: response.data }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.source.cancel();
  }
  render() {
    if (this.state.valid === undefined) {
      return <Navbar searchDefault={this.props.searchDefault} />;
    }
    if (this.state.valid === false) {
      return <Navbar searchDefault={this.props.searchDefault} />;
    } else {
      return <NavbarMain searchDefault={this.props.searchDefault} />;
    }
  }
}

export default NavbarSwitch;
