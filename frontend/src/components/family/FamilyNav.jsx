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
        <div className="familyNavItemWrapper">
          <Link to="/family/members" className="familyNavItem">
            Members
          </Link>
        </div>
        <div className="familyNavItemWrapper">
          <Link to="/family/invite" className="familyNavItem">
            Invite
          </Link>
        </div>
        <div className="familyNavItemWrapper">
          <Link to="/family/settings" className="familyNavItem">
            Settings
          </Link>
        </div>
        <div className="familyNavItemWrapper">
          <Link to="/" className="familyNavItem">
            Dashboard
          </Link>
        </div>
      </div>
    );
  }
}

export default FamilyNav;
