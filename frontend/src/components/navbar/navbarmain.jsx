import React, { Component } from "react";
import "./navbar.css";
import NavbarSearch from "./navbarSearch";

import NavbarLogout from "./navbarLogout";
import { Link } from "react-router-dom";

class NavbarMain extends Component {
  state = {
    type: "navContent",
    visible: "hide",
  };

  handleSearch = () => {
    if (window.location.pathname !== "/search") {
      return <NavbarSearch />;
    }
  };

  render() {
    return (
      <div id="navWrapper">
        <button
          id="navBurger"
          onClick={() =>
            this.state.type === "navContent"
              ? this.setState({ type: "navDropdown", visible: "show" })
              : this.setState({ type: "navContent", visible: "hide" })
          }
        >
          <div className="navBurgerLine"></div>
          <div className="navBurgerLine"></div>
          <div className="navBurgerLine"></div>
        </button>
        <div id={this.state.type} className={this.state.visible}>
          <Link to="/" style={{ textDecoration: "none", outline: "none" }}>
            <span id="title">Receiply</span>
          </Link>
          <Link
            to="/browse"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span className="navitem">Browse</span>
          </Link>

          <Link
            to="/upload"
            style={{
              textDecoration: "none",
              outline: "none",
              backgroundColor: "rgb(136,228,138)",
              borderRadius: 3,
              lineHeight: 1,
              padding: 5,
            }}
          >
            <span className="navitem" id="navitemupload">
              Upload Recipe
            </span>
          </Link>
          <Link
            to="/family"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span className="navitem">Family</span>
          </Link>
          <Link
            to="/myrecipes"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span className="navitem">My Recipes</span>
          </Link>

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
