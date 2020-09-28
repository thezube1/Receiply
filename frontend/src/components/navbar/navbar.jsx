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
          <Link to="/browse" style={{ textDecoration: "none" }}>
            <span className="navitem">Browse</span>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <span className="navitem">About</span>
          </Link>

          <div id="accountitemswrapper">
            <NavbarSearch searchDefault={this.props.searchDefault} />
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
