import React, { Component } from "react";
import "../components/reset/reset.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingPage from "../Loading";
import NavbarSwitch from "../components/navbar/navbarswitch";

class ResetPage extends Component {
  state = {
    reset: undefined,
    oldPassword: "",
    newPassword: "",
    response: undefined,
  };

  componentDidMount() {
    axios
      .get(`/api/user/password/forgot/${this.props.match.params.reset}`)
      .then((res) => this.setState({ reset: res.data }));
  }

  handleSubmit = () => {
    axios
      .put("/api/user/password/reset", {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      })
      .then((res) => this.setState({ response: res.data }));
  };

  render() {
    if (this.state.reset === undefined) {
      return <LoadingPage />;
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
                    Return to dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="resetHeader">Reset</div>
                <div>
                  <input
                    className="settingsInput resetInput"
                    type="text"
                    placeholder="Enter old password"
                    onChange={(event) =>
                      this.setState({ oldPassword: event.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    className="settingsInput resetInput"
                    type="text"
                    placeholder="Enter new password"
                    onChange={(event) =>
                      this.setState({ newPassword: event.target.value })
                    }
                  />
                </div>
                <button className="verifyButton resetButton">
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
