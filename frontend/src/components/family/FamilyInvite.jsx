import React, { Component } from "react";
import axios from "axios";

class FamilyInvite extends Component {
  state = {
    inviteLink: undefined,
  };

  onCreate = () => {
    axios.get("/api/createinvite").then((result) => {
      this.setState({
        inviteLink: `receiply.com/inviteurl/${result.data}`,
      });
    });
  };
  render() {
    return (
      <div id="famSetInvWrapper">
        <div className="famSetInvHeader">Create a 30 minute invite link</div>
        <input
          type="button"
          value="Generate"
          className="famSetInvGenerate"
          onClick={this.onCreate}
        />
        <div id="famSetInvLink">{this.state.inviteLink}</div>
      </div>
    );
  }
}

export default FamilyInvite;
