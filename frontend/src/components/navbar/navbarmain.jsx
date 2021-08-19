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

/*
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
      <div
        id="navWrapper"
        style={{
          position: this.props.anchor ? "static" : "fixed",
        }}
      >
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
          <Link
            className="navItemLink"
            to="/"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span id="title">Receiply</span>
          </Link>
          <Link
            to="/browse"
            className="navItemLink"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span className="navitem">Browse</span>
          </Link>

          <Link
            className="navItemLink"
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
            className="navItemLink"
            to="/family"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span className="navitem">Family</span>
          </Link>
          <Link
            className="navItemLink"
            to="/myrecipes"
            style={{ textDecoration: "none", outline: "none" }}
          >
            <span className="navitem">My Recipes</span>
          </Link>

          <span id="accountitemswrapper">
            {this.handleSearch()}
            <Link
              className="navItemLink"
              to="/settings"
              style={{ textDecoration: "none" }}
            >
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
*/
