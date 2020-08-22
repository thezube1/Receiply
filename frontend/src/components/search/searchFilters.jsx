import React, { Component } from "react";
import "./searchfilter.css";
import SearchFilterShare from "./Filters/SearchFilterShare";

class SearchFilter extends Component {
  state = {};
  render() {
    return (
      <div id="searchFilterWrapper">
        <div id="searchFilterContent">
          <div id="searchFilterTitle">Search filters</div>
          <SearchFilterShare query={this.props.query} />
          <div id="searchFilterShareWrapper"></div>
        </div>
      </div>
    );
  }
}

export default SearchFilter;
