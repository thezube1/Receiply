import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarMain from "../navbar/navbarmain";

class FamilyLinkInvite extends Component {
  state = {
    family: "",
  };
  componentDidMount() {
    axios
      .get(`/api/invite/${this.props.match.params.familyID}`)
      .then((result) => {
        this.setState({ family: result.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  render() {
    if (this.state.family === false) {
      return (
        <React.Fragment>
          <NavbarMain />
          <div id="famInvFailed">Failed to add to family</div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <NavbarMain />
        <div id="famInvWrapper">
          <div>Welcome to the family!</div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span id="famInvReturn">Return to dashboard</span>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default FamilyLinkInvite;
