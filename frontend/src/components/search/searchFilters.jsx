import React, { Component } from "react";
import "./searchfilter.css";

class SearchFilter extends Component {
  state = {};
  render() {
    return (
      <div id="searchFilterWrapper">
        <div id="searchFilterContent">
          <div id="searchFilterTitle">Search filters</div>
          <div id="searchFilterShareWrapper">
            <div>
              <div className="searchFilterHeader">Share type:</div>
              <input type="radio" id="private" value="Private" />
              <span>Private</span> <br />
              <input type="radio" id="family" value="Family" />
              <span>Family</span> <br />
              <input type="radio" id="public" value="Public" />
              <span>Public</span>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFilter;
