import React, { Component } from "react";
import "./navbar.css";
import "./new_navbar.css";
import { Link } from "react-router-dom";
import NavbarSearch from "./navbarSearch";

class NavbarMain extends Component {
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
    if (this.state.width > 980) {
      return (
        <div id="navbar-wrapper">
          <Link to="/upload/manual" style={{ textDecoration: "none" }}>
            <div className="navbar-item" id="navbar-create">
              Create
            </div>
          </Link>
          <Link to="/family" style={{ textDecoration: "none" }}>
            <div className="navbar-item" id="navbar-family">
              Family
            </div>
          </Link>
          {this.state.width >= 1400 ? (
            <Link to="/" style={{ textDecoration: "none" }}>
              <div id="navbar-title">Receiply</div>
            </Link>
          ) : (
            false
          )}

          <Link to="/browse" style={{ textDecoration: "none" }}>
            <div className="navbar-item">Browse</div>
          </Link>
          {this.state.width < 1400 ? (
            <Link to="/" style={{ textDecoration: "none" }}>
              <div id="navbar-title">Receiply</div>
            </Link>
          ) : (
            false
          )}
          <Link to="/myrecipes" style={{ textDecoration: "none" }}>
            <div className="navbar-item" id="navbar-recipes">
              My Recipes
            </div>
          </Link>
          {this.state.width > 1400 ? (
            <>
              {" "}
              <div id="navbar-right">
                <Link to="/settings" style={{ textDecoration: "none" }}>
                  <div className="navbar-item" id="navbar-settings">
                    Settings
                  </div>
                </Link>
                <div>
                  <NavbarSearch searchDefault={this.props.searchDefault} />
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/settings" style={{ textDecoration: "none" }}>
                <div className="navbar-item" id="navbar-settings">
                  Settings
                </div>
              </Link>
              <div>
                <NavbarSearch searchDefault={this.props.searchDefault} />
              </div>
            </>
          )}
        </div>
      );
    } else {
      return (
        <>
          <button
            id="navbar-burger"
            onClick={() => this.setState({ open: !this.state.open })}
          >
            <div
              className="navbar-line"
              style={{
                transform: this.state.open
                  ? "translateY(8px) rotate(45deg)"
                  : "rotate(0deg)",
              }}
            ></div>
            <div
              className="navbar-line"
              style={{ opacity: this.state.open ? 0 : 1 }}
            ></div>
            <div
              className="navbar-line"
              style={{
                transform: this.state.open
                  ? "translateY(-9px) rotate(-45deg)"
                  : "rotate(0deg)",
              }}
            ></div>
          </button>
          <div
            id="navbar-mobile-wrapper"
            style={{ opacity: this.state.open ? 1 : 0 }}
          >
            <div className="navbar-item-mobile ">Receiply</div>
          </div>
        </>
      );
    }
  }
}

export default NavbarMain;
