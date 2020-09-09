import React, { Component } from "react";
import { connect } from "react-redux";
import { search_query } from "../actions/actions";

import axios from "axios";

import queryString from "query-string";
import { isEqual } from "lodash";

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
      this.props.write_search(parsed);
      this.setState({ query: parsed, check: true });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    axios.get("/api/recipes/family", { params: { ID: window.location.href } });
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (isEqual(parsed, previousState.query) === false) {
      this.props.write_search(parsed);
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
          <div style={{ gridRow: "2/3" }}>
            <div className="browseHeader">Family recipes</div>
            <div id="familyContent" className="contentOutline"></div>
          </div>
          <div style={{ gridRow: "3/4", gridColumn: "2/3" }}>
            <div className="browseHeader">Public recipes</div>
            <div id="publicContent" className="contentOutline"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_search: (event) => dispatch(search_query(event)),
  };
};

const mapStateToProps = (state) => {
  return {
    search_query: state.search_query,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
