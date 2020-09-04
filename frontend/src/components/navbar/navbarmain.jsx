import React, { Component } from "react";
import "./navbar.css";
import NavbarSearch from "./navbarSearch";

import { Link } from "react-router-dom";

class NavbarMain extends Component {
  state = {};

  handleSearch = () => {
    if (window.location.pathname !== "/search") {
      return <NavbarSearch searchDefault={this.props.searchDefault} />;
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
            <span className="navitem">Browse</span>
          </Link>

          <Link to="/upload" style={{ textDecoration: "none" }}>
            <span className="navitem">Upload</span>
          </Link>
          <Link to="/family" style={{ textDecoration: "none" }}>
            <span className="navitem">Family</span>
          </Link>
          <span className="navitem">My Recipies</span>

          <span id="accountitemswrapper">
            {this.handleSearch()}

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
