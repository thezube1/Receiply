import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "../resetPassword/reset.css";

class ResetPassword extends Component {
  state = {
    show: false,
    email: "",
    response: undefined,
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <button
            id="resetPasswordButton"
            onClick={() => this.setState({ show: true })}
          >
            Forgot password
          </button>
        </div>
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Reset password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.response !== true ? (
              <div>
                <input
                  className="settingsInput"
                  type="text"
                  placeholder="Enter account email"
                  style={{ width: 300 }}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button
                    className="settingsItemButton"
                    onClick={() =>
                      axios
                        .post(`/api/user/password/forgot/${this.state.email}`)
                        .then((res) => this.setState({ response: res.data }))
                    }
                  >
                    Send password reset
                  </button>
                  <button
                    className="settingsItemButton settingsItemCancel"
                    onClick={() => this.setState({ show: false })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: 300,
                  fontSize: 20,
                }}
              >
                Password resent link sent
              </div>
            )}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ResetPassword;
