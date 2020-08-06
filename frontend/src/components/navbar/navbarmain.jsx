import React, { Component } from "react";
import "./navbar.css";
import NavbarSearch from "./navbarSearch";

import { Link } from "react-router-dom";
import Navbar from "./navbar";

class NavbarMain extends Component {
  state = {};
  render() {
    return (
      <div id="navWrapper">
        <div id="navContent">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span id="title">Receiply</span>
          </Link>
          <span className="navitem">Browse</span>
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <span className="navitem">Upload</span>
          </Link>
          <Link to="/family" style={{ textDecoration: "none" }}>
            <span className="navitem">Family</span>
          </Link>
          <span className="navitem">My Recipies</span>
          <NavbarSearch />
          <span id="accountitemswrapper">
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
          </span>
        </div>
      </div>
    );
  }
}

export default NavbarMain;
