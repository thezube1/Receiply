import React, { Component } from "react";
import axios from "axios";

class PublicUser extends Component {
  state = {};

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  componentDidMount() {
    axios
      .get(`/api/getuserinfo/${this.props.match.params.user}`, {
        cancelToken: this.source.token,
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log(thrown.message);
        } else {
          throw thrown;
        }
      });
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by user");
  }
  render() {
    console.log(this.props.match.params.user);
    return <div>{this.props.match.params.user}</div>;
  }
}

export default PublicUser;
