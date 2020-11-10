import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

class FamilyPersonalSettings extends Component {
  state = {
    modalType: undefined,
    modal: false,
    family: undefined,
    response: undefined,
  };

  componentDidMount() {
    axios.get("/api/family").then((res) => this.setState({ family: res.data }));
  }

  handleModalContent = () => {
    switch (this.state.modalType) {
      case "leave":
        return (
          <div>
            {this.state.response === true ? (
              window.location.reload(false)
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {this.state.response === false ? (
              <div id="loginError">An error has occured</div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <div>Are you sure you want to leave your family?</div>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                className="settingsItemButton"
                onClick={() =>
                  axios
                    .put("/api/family/leave", {
                      description: this.state.description,
                    })
                    .then((res) => this.setState({ response: res.data }))
                }
              >
                Leave family
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
    return (
      <div>
        <Modal
          show={this.state.modal}
          onHide={() => this.setState({ modal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm leave</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.handleModalContent()}</Modal.Body>
        </Modal>
        <div className="settingsItemWrapper">
          <div>
            <span className="settingsHeader">Leave family</span>
          </div>
          <button
            className="settingsItemButton"
            onClick={() => this.setState({ modal: true, modalType: "leave" })}
          >
            Leave family
          </button>
        </div>
      </div>
    );
  }
}

export default FamilyPersonalSettings;
