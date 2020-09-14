import React, { Component } from "react";
import "./navbar.css";
import NavbarSearch from "./navbarSearch";

import NavbarLogout from "./navbarLogout";
import { Link } from "react-router-dom";

class NavbarMain extends Component {
  state = {};

  handleSearch = () => {
    if (window.location.pathname !== "/search") {
      return <NavbarSearch />;
    }
  };
  render() {
    return (
      <div id="navWrapper">
        <div id="navContent">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span id="title">Receiply</span>
          </Link>
          <Link to="/browse" style={{ textDecoration: "none" }}>
            <span className="navitem">BROWSE</span>
          </Link>

          <Link to="/upload" style={{ textDecoration: "none" }}>
            <span className="navitem">UPLOAD</span>
          </Link>
          <Link to="/family" style={{ textDecoration: "none" }}>
            <span className="navitem">FAMILY</span>
          </Link>
          <span className="navitem">MY RECIPES</span>

          <span id="accountitemswrapper">
            {this.handleSearch()}
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <span className="navitem accountitems" id="signup">
                Settings
              </span>
            </Link>
            <NavbarLogout />
          </span>
        </div>
      </div>
    );
  }
}

export default NavbarMain;
