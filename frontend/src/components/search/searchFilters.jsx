import React, { Component } from "react";
import "./searchfilter.css";
import SearchFilterShare from "./Filters/SearchFilterShare";
import SearchFilterIngredients from "./Filters/SearchFilterIngredients";

class SearchFilter extends Component {
  state = {};
  render() {
    return (
      <div id="searchFilterWrapper">
        <div id="searchFilterContent">
          <div id="searchFilterTitle">Filters</div>
          <SearchFilterShare query={this.props.query} />
          <SearchFilterIngredients query={this.props.query} />
          <div id="searchFilterShareWrapper"></div>
        </div>
      </div>
    );
  }
}

export default SearchFilter;
