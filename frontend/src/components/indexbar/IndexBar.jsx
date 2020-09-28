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
              <div className="indexBarSectionItem">Privacy policy</div>
              <div className="indexBarSectionItem">Cookie policy</div>
              <div className="indexBarSectionItem">Contact</div>
              <div className="indexBarSectionItem">Report</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexBar;
