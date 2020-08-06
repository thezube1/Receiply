import React, { Component } from "react";
import "./navbar.css";
import NavbarSearch from "./navbarSearch";

import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div id="navWrapper">
        <div id="navContent">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span id="title">Receiply</span>
          </Link>

          <span className="navitem">Browse</span>
          <span className="navitem">About</span>
          <NavbarSearch />

          <div id="accountitemswrapper">
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span className="navitem accountitems" id="signup">
                Sign up
              </span>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="navitem accountitems" id="login">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
