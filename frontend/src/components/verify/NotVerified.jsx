import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";

class NotVerified extends Component {
  state = {
    show: false,
    resent: false,
  };

  componentDidMount() {
    if (this.props.verified === false) {
      this.setState({ show: true });
    }
  }

  handleResend = () => {
    axios
      .get("/api/verify/resend")
      .then((res) => this.setState({ resent: res.data }));
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Verify</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.resent !== true ? (
              <div>
                <div
                  className="verifyHeader"
                  style={{ fontSize: 25, marginBottom: 10 }}
                >
                  Please verify your account
                </div>
                <button
                  onClick={() => this.handleResend()}
                  className="settingsItemButton"
                >
                  Resend email
                </button>
              </div>
            ) : (
              <div className="verifyHeader" style={{ fontSize: 25 }}>
                Email resent!
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verified: state.verify_reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: () => dispatch({ type: "VERIFIED" }),
    unverify: () => dispatch({ type: "UNVERIFIED" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotVerified);
