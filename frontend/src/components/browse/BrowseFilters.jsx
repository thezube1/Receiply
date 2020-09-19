import React, { Component } from "react";
import { Link } from "react-router-dom";

class BrowseFilters extends Component {
  state = {};
  render() {
    return (
      <div id="browseFilter">
        <div id="browseFilterTitle">Filters</div>
        <div id="browseFilterBar"></div>
        <div className="browseFilterButtonWrapper">
          <Link className="browseFilterButton" to="/browse/family">
            Family recipes
          </Link>
        </div>
        <div className="browseFilterButtonWrapper">
          <Link className="browseFilterButton" to="/browse/public">
            Public recipes
          </Link>
        </div>
      </div>
    );
  }
}

export default BrowseFilters;
