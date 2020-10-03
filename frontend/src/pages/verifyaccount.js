import React, { Component } from "react";
import axios from "axios";
import LoadingPage from "../Loading";
import { Link } from "react-router-dom";
import "../components/verify/verify.css";
import NavbarSwitch from "../components/navbar/navbarswitch";

class VerifyAccountPage extends Component {
  state = {
    userVerified: undefined,
    verifiedStatus: undefined,
  };

  componentDidMount() {
    Promise.all([
      axios
        .put(`/api/verify/${this.props.match.params.verify}`)
        .then((res) => this.setState({ verifiedStatus: res.data })),
      axios
        .get("/api/verify/user")
        .then((res) => this.setState({ userVerified: res.data }))
        .catch((err) => console.log(err)),
    ]);
  }

  render() {
    console.log(this.state.userVerified);
    if (
      this.state.verifiedStatus === undefined ||
      this.state.userVerified === undefined
    ) {
      return <LoadingPage />;
    } else if (this.state.userVerified === true) {
      return (
        <React.Fragment>
          <NavbarSwitch />
          <div className="verifyWrapper">
            <div className="verifyContent">
              <div className="verifyHeader">You are already verified!</div>
              <Link to="/" className="verifyButton">
                Return to dashboard
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (this.state.verifiedStatus === true) {
      return (
        <React.Fragment>
          <NavbarSwitch />
          <div className="verifyWrapper">
            <div className="verifyContent">
              <div className="verifyHeader">Successfully verified!</div>
              <Link to="/" className="verifyButton">
                Return to dashboard
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (this.state.verifiedStatus === "badJWT") {
      return (
        <React.Fragment>
          <NavbarSwitch />
          <div className="verifyWrapper">
            <div className="verifyContent">
              <div className="verifyHeader">Invalid verification token</div>
              <Link to="/" className="verifyButton">
                Return to dashboard
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default VerifyAccountPage;
