import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";

class FamilyMemberRequests extends Component {
  state = {
    setShow: false,
    users: [],
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  handleShow = () => {
    this.setState({ setShow: true });
  };
  handleClose = () => {
    this.setState({ setShow: false });
  };

  handleAccept = (index) => {
    const user = this.state.users[index];
    axios.post("/api/acceptfamilyuser", user);
  };

  renderUsers = () => {
    if (this.state.users.length !== 0) {
      return (
        <div>
          {this.state.users.map((item, index) => (
            <div key={item.USER_ID} id="familyRequestItem">
              <span id="familyRequestHeader">user:</span>
              <span>{item.USERNAME}</span>
              <Button
                variant="success"
                onClick={() => {
                  this.handleAccept(index);
                }}
              >
                Accept
              </Button>
              <Button variant="danger">Ignore</Button>
            </div>
          ))}
        </div>
      );
    } else {
      const icon = {
        hidden: {
          pathLength: 0,
          fill: "rgba(255, 255, 255, 0)",
        },
        visible: {
          pathLength: 1,
          fill: "rgba(255, 255, 255, 1)",
        },
      };
      return (
        <React.Fragment>
          <div>No requests</div>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            variants={this.pathVariants}
            initial="hidden"
            animate="visible"
            ease="easeInOut"
          >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </motion.svg>
        </React.Fragment>
      );
    }
  };

  componentDidMount() {
    axios
      .get("/api/getfamilyrequests", { cancelToken: this.source.token })
      .then((response) => this.setState({ users: response.data }));
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }
  render() {
    return (
      <React.Fragment>
        <input
          type="button"
          id="familyRequestLink"
          value="Join requests"
          onClick={this.handleShow}
        />
        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Join requests</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.renderUsers()}</Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default FamilyMemberRequests;
