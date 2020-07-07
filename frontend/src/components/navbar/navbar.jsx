import React, { Component } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div id="wrapper">
        <div id="title">Receiply</div>
        <div id="navitemswrapper">
          <span class="navitem">Browse</span>
          <span class="navitem">About</span>
        </div>
        <div id="accountitemswrapper">
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span class="navitem accountitems" id="signup">
              Sign up
            </span>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span class="navitem accountitems" id="login">
              Login
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
