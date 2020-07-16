import React, { Component } from "react";
import { Link } from "react-router-dom";

class FamilyNav extends Component {
  state = {};
  render() {
    return (
      <div id="familyNavWrapper">
        <Link
          to="/dashboard/family"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="familyNavHeader">Family</div>
        </Link>
        <div className="familyNavItem">Manage</div>
        <Link
          to="/dashboard/family/members"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="familyNavItem">Members</div>
        </Link>
        <Link
          to="/dashboard/family/invite"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="familyNavItem">Invite</div>
        </Link>
        <div className="familyNavItem">Settings</div>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="familyNavItem">Dashboard</div>
        </Link>
      </div>
    );
  }
}

export default FamilyNav;
