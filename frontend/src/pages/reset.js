import React, { Component } from "react";
import "../components/resetPassword/reset.css";
import ResetPassword from "../components/resetPassword/ResetPassword";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingPage from "../Loading";
import NavbarSwitch from "../components/navbar/navbarswitch";

class ResetPage extends Component {
  state = {
    reset: undefined,
    oldPassword: "",
    newPassword: "",
    errors: undefined,
    response: undefined,
    show: "password",
  };

  componentDidMount() {
    axios
      .get(`/api/user/password/forgot/${this.props.match.params.reset}`)
      .then((res) => this.setState({ reset: res.data }));
  }

  handleSubmit = () => {
    if (this.state.oldPassword === this.state.newPassword) {
      this.setState({ errors: "samePass" });
    }
    axios
      .put("/api/user/password/reset", {
        email: this.state.reset,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      })
      .then((res) => this.setState({ response: res.data }));
  };

  render() {
    if (this.state.reset === undefined) {
      return <LoadingPage />;
    } else if (this.state.response === true) {
      return (
        <React.Fragment>
          <NavbarSwitch />
          <div id="resetWrapper">
            <div className="verifyContent">
              <div className="resetHeader">Password reset successfully</div>
              <Link to="/" className="verifyButton resetButton">
                Return to home
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <NavbarSwitch />
          <div id="resetWrapper">
            {this.state.reset === false ? (
              <div>
                <div className="verifyContent">
                  <div className="resetHeader">Invalid reset link</div>
                  <Link to="/" className="verifyButton resetButton">
                    Return to home
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="resetHeader">Reset</div>
                {this.state.response === "badPass" ? (
                  <div id="loginError">Current password incorrect</div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                {this.state.errors === "samePass" ? (
                  <div id="loginError">
                    You cannot use your current password
                  </div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                <div>
                  <input
                    className="settingsInput resetInput"
                    type={this.state.show}
                    name="oldPassword"
                    placeholder="Enter old password"
                    onChange={(event) =>
                      this.setState({ oldPassword: event.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    className="settingsInput resetInput"
                    type={this.state.show}
                    placeholder="Enter new password"
                    name="newPassword"
                    onChange={(event) =>
                      this.setState({ newPassword: event.target.value })
                    }
                  />
                </div>
                <div
                  className="signupDescription"
                  style={{ display: "flex", gap: 5, marginBottom: 10 }}
                >
                  <input
                    type="checkbox"
                    onClick={() =>
                      this.state.show === "password"
                        ? this.setState({ show: "text" })
                        : this.setState({ show: "password" })
                    }
                  />
                  Show password
                </div>
                <button
                  onClick={this.handleSubmit}
                  className="verifyButton resetButton"
                >
                  Reset password
                </button>
              </div>
            )}
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ResetPage;
