import React, { Component } from "react";
import "./navbar.css";

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
          <span class="navitem accountitems" id="signup">
            Sign up
          </span>
          <span class="navitem accountitems" id="login">
            Login
          </span>
        </div>
      </div>
    );
  }
}

export default Navbar;
