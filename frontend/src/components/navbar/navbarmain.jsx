import React, { Component } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";

class NavbarMain extends Component {
  state = {};
  render() {
    return (
      <div id="navWrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div id="title">Receiply</div>
        </Link>
        <div id="navitemswrapper">
          <span className="navitem">Browse</span>
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <span className="navitem">Upload</span>
          </Link>
          <Link to="/family" style={{ textDecoration: "none" }}>
            <span className="navitem">Family</span>
          </Link>
          <span className="navitem">My Recipies</span>
          <span className="navitem">Search</span>
        </div>
        <div id="accountitemswrapper">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="navitem accountitems" id="signup">
              Settings
            </span>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="navitem accountitems" id="login">
              Logout
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default NavbarMain;
