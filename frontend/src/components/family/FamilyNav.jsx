import React, { Component } from "react";
import "./family-nav.css";
import { Link } from "react-router-dom";

class FamilyNav extends Component {
  state = {
    show: false,
  };
  render() {
    return (
      <>
        <div
          id="family-nav-collapsed"
          style={{
            width: this.state.show ? 780 : false,
            height: this.state.show ? 80 : false,
            transitionDelay: this.state.show ? "0s" : "0.5s",
          }}
        >
          <button
            style={{
              transitionDelay: this.state.show ? "0s" : "0.5s",
              background: "none",
              border: "none",
              paddingLeft: this.state.show ? 30 : 14,
            }}
            onClick={() => this.setState({ show: !this.state.show })}
          >
            <div
              className="navbar-line family-line"
              style={{
                width: this.state.show ? 40 : false,
                transform: this.state.show
                  ? "translateY(9px) rotate(-45deg)"
                  : false,
              }}
            ></div>
            <div
              className="navbar-line family-line"
              style={{ opacity: this.state.show ? 0 : 1 }}
            ></div>
            <div
              style={{
                width: this.state.show ? 40 : false,
                transform: this.state.show
                  ? "translateY(-10px) rotate(45deg)"
                  : false,
              }}
              className="navbar-line family-line"
              id="family-line-3"
            ></div>
          </button>
          <div
            id="family-nav-wrapper"
            style={{
              opacity: this.state.show ? 1 : 0,
              visibility: this.state.show ? "visible" : "hidden",
              transitionDelay: this.state.show ? "0.5s" : "0s",
            }}
          >
            <Link
              to="/family/members"
              style={{
                textDecoration: "none",
                color: "black",
                width: "max-content",
              }}
            >
              <div className="family-nav-button">Members</div>
            </Link>
            <Link
              to="/family/invite"
              style={{
                textDecoration: "none",
                color: "black",
                width: "max-content",
              }}
            >
              <div className="family-nav-button">Invite</div>
            </Link>
            <Link
              to="/family/settings"
              style={{
                textDecoration: "none",
                color: "black",
                width: "max-content",
              }}
            >
              <div className="family-nav-button">Settings</div>
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                width: "max-content",
              }}
            >
              <div className="family-nav-button">Dashboard</div>
            </Link>
          </div>
        </div>
        {/*  */}
      </>
    );
  }
}

export default FamilyNav;
/*
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

*/
