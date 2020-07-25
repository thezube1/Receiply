import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import axios from "axios";

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

  componentDidMount() {
    axios
      .get("/api/getfamilyrequests", { cancelToken: this.source.token })
      .then((response) => this.setState({ users: response.data }));
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }
  render() {
    console.log(this.state.users);
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
          <Modal.Body>
            <div>
              {this.state.users.map((item) => (
                <div key={item.USER_ID}>{item.USERNAME}</div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default FamilyMemberRequests;
