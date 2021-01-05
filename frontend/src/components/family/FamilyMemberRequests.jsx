import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class FamilyMemberRequests extends Component {
  state = {
    setShow: false,
    users: undefined,
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
    axios.put("/api/family/request/accept", user);
    window.location.reload(false);
  };

  renderUsers = () => {
    if (this.state.users === undefined) {
      return <div>Loading...</div>;
    } else if (this.state.users === false) {
      return (
        <React.Fragment>
          <div>No requests</div>
        </React.Fragment>
      );
    } else {
      console.log(this.state.users);
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
    }
  };

  componentDidMount() {
    axios
      .get("/api/family/request", { cancelToken: this.source.token })
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
          <Modal.Body>
            {this.state.users === undefined ? (
              <div>Loading...</div>
            ) : (
              this.renderUsers()
            )}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default FamilyMemberRequests;
