import React, { Component } from "react";
import axios from "axios";
import NotFoundPage from "./404page";
import "../components/userProfile/user.css";
import NavbarSwitch from "../components/navbar/navbarswitch";

import LoadingPage from "../Loading";

import UserInfo from "../components/userProfile/UserInfo";
import UserDescription from "../components/userProfile/UserDescription";
import UserRecipes from "../components/userProfile/UserRecipes";

class PublicUser extends Component {
  state = {
    user: [{ USERNAME: "", FIRST_NAME: "", LAST_NAME: "", FAMILY: "" }],
    recipes: [],
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  componentDidMount() {
    axios
      .get(`/api/user/${this.props.match.params.user}`, {
        cancelToken: this.source.token,
      })
      .then((response) => this.setState({ user: response.data }));
    if (this.state.user[0].USERNAME !== "") {
      axios
        .get(`/api/userrecipes/public/${this.props.match.params.user}`, {
          cancelToken: this.source.token,
        })
        .then((response) => this.setState({ recipes: response.data }));
    }
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    if (this.state.user === false) {
      return <NotFoundPage />;
    } else if (this.state.user[0].USERNAME === "") {
      return <LoadingPage />;
    }
    return (
      <React.Fragment>
        <NavbarSwitch />
        <div id="userWrapper">
          <div id="userContent">
            <div id="userBlock1">
              <UserInfo
                username={this.props.match.params.user}
                first={this.state.user[0].FIRST_NAME}
                last={this.state.user[0].LAST_NAME}
                family={this.state.user[0].FAMILY}
              />
            </div>
            <div id="userBlock2">
              <UserDescription />
            </div>
            <div id="userBlock3" className="userBlockOutline">
              <UserRecipes recipes={this.state.recipes} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PublicUser;
