import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarSearch from "./navbarSearch";

class Navbar extends Component {
  state = { width: 0, open: false };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
    this.updateWidth();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  updateWidth = () => {
    this.setState({ width: window.innerWidth });
  };
  render() {
    return (
      <div id="navbar-wrapper">
        <Link to="/browse" style={{ textDecoration: "none" }}>
          <div className="navbar-item">Browse</div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div id="navbar-title">Receiply</div>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <div className="navbar-item" id="navbar-about">
            About
          </div>
        </Link>

        <div id="navbar-right" style={{ right: 20 }}>
          <div>
            <NavbarSearch searchDefault={this.props.searchDefault} />
          </div>
          <Link to="/login" style={{ textDecoration: "none", marginLeft: 20 }}>
            <div className="navbar-item" id="navbar-create">
              Login
            </div>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none", marginLeft: 20 }}>
            <div className="navbar-item" id="navbar-create">
              Sign up
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
