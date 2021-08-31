import React, { Component } from "react";
import "./family-members.css";

class MemberCard extends Component {
  state = {};
  render() {
    return (
      <div className="family-member-wrapper">
        <div style={{ display: "grid", justifyItems: "center" }}>
          <div className="family-member-image"></div>
          <div className="family-member-name">{this.props.name}</div>
          <div className="family-member-role">Family Manager</div>
        </div>
      </div>
    );
  }
}

export default MemberCard;
