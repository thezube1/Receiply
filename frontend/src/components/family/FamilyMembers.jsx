import React, { Component } from "react";
import axios from "axios";
import FamilyMemberRequests from "./FamilyMemberRequests";

class FamilyMembers extends Component {
  state = {
    members: undefined,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  componentDidMount() {
    axios
      .get("/api/getfamily/members", { cancelToken: this.source.token })
      .then((result) => {
        this.setState({ members: result.data });
      })
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    if (this.state.members === undefined) {
      <div>Loading...</div>;
    }
    return (
      <div id="familyMemberWrapper">
        <FamilyMemberRequests />
        <div className="familyMemberHeader">Members:</div>
        {this.state.members === undefined ? (
          <div className="familyMemberItem">Loading...</div>
        ) : (
          this.state.members.map((content, index) => (
            <div className="familyMemberItem" key={content.USER_ID}>{`${
              index + 1
            }. ${content.FIRST_NAME} ${content.LAST_NAME}`}</div>
          ))
        )}
      </div>
    );
  }
}

export default FamilyMembers;
