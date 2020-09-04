import React, { Component } from "react";

import axios from "axios";
import queryString from "query-string";
import { isEqual } from "lodash";

import LoadingPage from "../Loading";
import NavbarSwitch from "../components/navbar/navbarswitch";
import SearchFilter from "../components/search/searchFilters";
import "../components/browse/browse.css";

class BrowsePage extends Component {
  state = {
    query: "",
    recipes: undefined,
    check: false,
  };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (this.state.check === false) {
      this.setState({ query: parsed, check: true });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (isEqual(parsed, previousState.query) === false) {
      this.setState({ query: parsed });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavbarSwitch />
        <div id="browseWrapper">
          <div id="browseFilters">
            <SearchFilter query={this.state.query} />
          </div>
          <div id="browseContent"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default BrowsePage;
