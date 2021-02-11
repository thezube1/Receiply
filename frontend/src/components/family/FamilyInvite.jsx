import React, { Component } from "react";
import axios from "axios";

class FamilyInvite extends Component {
  state = {
    inviteLink: undefined,
    copyStatus: false,
  };

  onCreate = () => {
    axios.get("/api/createinvite").then((result) => {
      this.setState({
        inviteLink: `receiply.com/inviteurl/${result.data}`,
      });
    });
  };

  copyToClipboard = () => {
    navigator.clipboard.writeText(this.state.inviteLink);
    this.setState({ copyStatus: true });
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
        {this.state.inviteLink !== undefined ? (
          <button onClick={() => this.copyToClipboard()} id="famSetInvCopy">
            {this.state.copyStatus === true ? "Copied!" : "Copy to Clipboard"}
          </button>
        ) : undefined}
      </div>
    );
  }
}

export default FamilyInvite;
