import React, { Component } from "react";
import axios from "axios";
import LoadingPage from "../../Loading";
import { Modal } from "react-bootstrap";

class SettingsAccount extends Component {
  state = {
    user: undefined,
    modal: false,
    modalType: undefined,
    newUsername: "",
    oldPass: "",
    newPass: "",
    email: "",
    check: undefined,
  };

  componentDidMount() {
    axios
      .get("/api/user/current")
      .then((res) => this.setState({ user: res.data }));
  }

  handleModalContent = () => {
    switch (this.state.modalType) {
      case "username":
        return (
          <div>
            {this.state.check === false ? (
              <div id="loginError">You are already using this username!</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {this.state.check === "badUsername" ? (
              <div id="loginError">Username unavailable</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}

            <input
              className="settingsInput"
              type="text"
              placeholder="Enter new username"
              onChange={(event) =>
                this.setState({ newUsername: event.target.value })
              }
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                className="settingsItemButton"
                onClick={() =>
                  axios
                    .put("/api/user/username", {
                      input: this.state.newUsername,
                    })
                    .then((res) => this.setState({ check: res.data }))
                }
              >
                Confirm
              </button>
              <button
                className="settingsItemButton settingsItemCancel"
                onClick={() => this.setState({ modal: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      case "password":
        return (
          <div>
            {this.state.check === "badPass" ? (
              <div id="loginError">Incorrect password</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {this.state.check === "passSame" ? (
              <div id="loginError">Password already in use</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <input
              className="settingsInput"
              type="password"
              placeholder="Enter old password"
              onChange={(event) =>
                this.setState({ oldPass: event.target.value })
              }
            />
            <br />
            <input
              className="settingsInput"
              type="password"
              placeholder="Enter new password"
              onChange={(event) =>
                this.setState({ newPass: event.target.value })
              }
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                className="settingsItemButton"
                onClick={() =>
                  axios
                    .put("/api/user/password", {
                      input: [this.state.oldPass, this.state.newPass],
                    })
                    .then((res) => this.setState({ check: res.data }))
                }
              >
                Confirm
              </button>
              <button
                className="settingsItemButton settingsItemCancel"
                onClick={() => this.setState({ modal: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      case "email":
        return (
          <div>
            {this.state.check === "usedEmail" ? (
              <div id="loginError">Email already in use</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {this.state.check === "badEmail" ? (
              <div id="loginError">Enter a valid email</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <input
              className="settingsInput"
              type="text"
              placeholder="Enter new email"
              onChange={(event) => this.setState({ email: event.target.value })}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                className="settingsItemButton"
                onClick={() =>
                  axios
                    .put("/api/user/email", { input: this.state.email })
                    .then((res) => this.setState({ check: res.data }))
                }
              >
                Confirm
              </button>
              <button
                className="settingsItemButton settingsItemCancel"
                onClick={() => this.setState({ modal: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      default:
        return <div>Error</div>;
    }
  };

  render() {
    if (this.state.user === undefined) {
      return <LoadingPage />;
    } else if (this.state.check === true) {
      return <React.Fragment>{window.location.reload(false)}</React.Fragment>;
    } else {
      return (
        <div>
          <Modal
            show={this.state.modal}
            onHide={() => this.setState({ modal: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Change settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.handleModalContent()}</Modal.Body>
          </Modal>
          <div className="settingsTitle">Account settings</div>
          <div className="settingsItemWrapper">
            <div>
              <span className="settingsHeader">Username: </span>
              <span>{this.state.user[0].USERNAME}</span>
            </div>
            <button
              className="settingsItemButton"
              onClick={() =>
                this.setState({ modal: true, modalType: "username" })
              }
            >
              Edit username
            </button>
          </div>
          <div className="settingsItemWrapper">
            <div>
              <span className="settingsHeader">Password </span>
            </div>
            <button
              className="settingsItemButton"
              onClick={() =>
                this.setState({ modal: true, modalType: "password" })
              }
            >
              Change password
            </button>
          </div>
          <div className="settingsItemWrapper">
            <div>
              <span className="settingsHeader">Email: </span>
              <span>{this.state.user[0].EMAIL}</span>
            </div>
            <button
              className="settingsItemButton"
              onClick={() => this.setState({ modal: true, modalType: "email" })}
            >
              Change email
            </button>
          </div>
        </div>
      );
    }
  }
}

export default SettingsAccount;
