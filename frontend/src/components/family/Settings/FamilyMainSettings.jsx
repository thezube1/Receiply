import React, { Component } from 'react';
import { Modal } from "react-bootstrap";


class FamilyMainSettings extends Component {
    state = {
        modalType: undefined,
        modal: false
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
          default:
            return <div>Error</div>;
        }
      };
    render() { 
        return <div><div className="settingsItemWrapper">
        <div>
          <span className="settingsHeader">Family description </span>
        </div>
        <button
          className="settingsItemButton"
          onClick={() =>
            this.setState({ modal: true, modalType: "description" })
          }
        >
          Edit description
        </button>
      </div></div>;
    }
}
 
export default FamilyMainSettings;