import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import axios from "axios";

import { Redirect } from "react-router-dom";

class NavbarLogout extends Component {
  state = {
    active: false,
    logout: undefined,
  };

  handleLogout = () => {
    axios.get("/api/logout").then((res) => this.setState({ logout: res.data }));
  };

  render() {
    if (this.state.logout === true) {
      return <Redirect to="/" />;
    } else {
      return (
        <React.Fragment>
          <button id="logout" onClick={() => this.setState({ active: true })}>
            <span className="navitem accountitems">Logout</span>
          </button>
          <Modal
            show={this.state.active}
            onHide={() => this.setState({ active: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <button id="logout" onClick={this.handleLogout}>
                  <span className="navitem accountitems">Logout</span>
                </button>
                <button id="logout">
                  <span
                    className="navitem accountitems"
                    style={{ backgroundColor: "#D5D5D5" }}
                  >
                    Cancel
                  </span>
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      );
    }
  }
}

export default NavbarLogout;
