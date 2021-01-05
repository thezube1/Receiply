import React, { Component } from "react";
import "./IndexBar.css";
import { Link } from "react-router-dom";

class IndexBar extends Component {
  state = {};
  render() {
    return (
      <div id="indexBarWrapper">
        <div id="indexBarContent">
          <div id="indexBarQuoteWrapper">
            <div id="indexBarQuote">
              We provide a connection to your family roots
            </div>
            <div id="indexBarDivider"></div>
          </div>
          <div id="indexBarSectionWrapper">
            <div className="indexBarSection">
              <Link to="/" className="indexBarLink">
                <span className="indexBarSectionItem">Home</span>
              </Link>
              <Link to="/about" className="indexBarLink">
                <span className="indexBarSectionItem">About</span>
              </Link>
              <Link to="/login" className="indexBarLink">
                <div className="indexBarSectionItem">Login</div>
              </Link>
              <Link to="/signup" className="indexBarLink">
                <div className="indexBarSectionItem">Signup</div>
              </Link>
            </div>
            <div className="indexBarSection">
              <Link to="/privacy" className="indexBarLink">
                <div className="indexBarSectionItem">Privacy Policy</div>
              </Link>
              <Link to="/terms-of-service" className="indexBarLink">
                <div className="indexBarSectionItem">Terms of Use</div>
              </Link>
              <Link to="/contact" className="indexBarLink">
                <div className="indexBarSectionItem">Contact</div>
              </Link>
              <div className="indexBarSectionItem">Report</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexBar;
