import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Radio, FormControlLabel, RadioGroup } from "@material-ui/core";
import LoadingPage from "../../Loading";

class SettingsPrivacy extends Component {
  state = {
    modal: false,
    modalType: undefined,
    visiblity: undefined,
    response: undefined,
  };

  componentDidMount() {
    axios
      .get("/api/user/privacy")
      .then((res) => this.setState({ visiblity: res.data }));
  }

  handleModalContent = () => {
    switch (this.state.modalType) {
      case "username":
        return (
          <div>
            {this.state.response === true ? (
              window.location.reload(false)
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <RadioGroup
              value={this.state.visiblity}
              name="radio"
              onChange={(event) =>
                this.setState({ visiblity: event.target.value })
              }
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
                checked={this.state.visiblity === "public" ? true : false}
              />
              <FormControlLabel
                value="family"
                control={<Radio />}
                label="Family-only"
                checked={this.state.visiblity === "family" ? true : false}
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
                checked={this.state.visiblity === "private" ? true : false}
              />
            </RadioGroup>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                className="settingsItemButton"
                onClick={() =>
                  axios
                    .put("/api/user/privacy", { privacy: this.state.visiblity })
                    .then((res) => this.setState({ response: res.data }))
                }
              >
                Save
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
    if (this.state.visiblity === undefined) {
      return <LoadingPage />;
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
          <div className="settingsTitle">Profile privacy</div>
          <div className="settingsItemWrapper">
            <div>
              <span className="settingsHeader">Public profile visibility</span>
            </div>
            <button
              className="settingsItemButton"
              onClick={() =>
                this.setState({ modal: true, modalType: "username" })
              }
            >
              Edit visiblity
            </button>
          </div>
        </div>
      );
    }
  }
}

export default SettingsPrivacy;
