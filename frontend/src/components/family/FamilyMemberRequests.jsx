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
              <Button
                variant="danger"
                onClick={() => {
                  axios.put(
                    "/api/family/request/ignore",
                    this.state.users[index]
                  );
                  window.location.reload(false);
                }}
              >
                Ignore
              </Button>
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
    console.log(this.state.users);
    return (
      <React.Fragment>
        <div id="familyRequestLinkWrapper">
          <div
            id="familyRequestNumbers"
            style={{
              display:
                this.state.users === undefined ||
                this.state.users === false ||
                this.state.users.length === 0
                  ? "none"
                  : "flex",
            }}
          >
            {this.state.users === undefined ? "." : this.state.users.length}
          </div>

          <button
            type="button"
            id="familyRequestLink"
            onClick={this.handleShow}
          >
            <div>Join Requests</div>
          </button>
        </div>
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
