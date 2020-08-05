import React, { Component } from "react";
import { Link } from "react-router-dom";

class FamilyNav extends Component {
  state = {};
  render() {
    return (
      <div id="familyNavWrapper">
        <Link to="/family" style={{ textDecoration: "none", color: "black" }}>
          <div className="familyNavHeader">Family</div>
        </Link>
        <div className="familyNavItem">Manage</div>
        <Link
          to="/family/members"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="familyNavItem">Members</div>
        </Link>
        <Link
          to="/family/invite"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="familyNavItem">Invite</div>
        </Link>
        <div className="familyNavItem">Settings</div>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div className="familyNavItem">Dashboard</div>
        </Link>
      </div>
    );
  }
}

export default FamilyNav;
