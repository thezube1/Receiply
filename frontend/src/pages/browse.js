import React, { Component } from "react";
import { connect } from "react-redux";
import {
  family_recipes,
  search_query,
  public_recipes,
} from "../actions/actions";

import axios from "axios";

import queryString from "query-string";
import { isEqual } from "lodash";

import NavbarSwitch from "../components/navbar/navbarswitch";
import SearchFilter from "../components/search/searchFilters";
import FamilyContent from "../components/browse/FamilyContent";
import PublicContent from "../components/browse/PublicContent";
import "../components/browse/browse.css";

class BrowsePage extends Component {
  state = {};

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    Promise.all([
      axios
        .get("/api/recipes/family", { params: { query: parsed } })
        .then((data) => this.props.write_family_recipes(data.data)),
      axios
        .get("/api/recipes/public", { params: { query: parsed } })
        .then((data) => this.props.write_public_recipes(data.data)),
    ]);

    this.props.write_query(parsed);
  }

  componentDidUpdate(previousProps, previousState) {
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (isEqual(parsed, previousProps.search_query) === false) {
      this.props.write_query(parsed);
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavbarSwitch />
        <div id="browseWrapper">
          <div id="browseFilters">
            <SearchFilter />
          </div>
          <div>
            <div>
              <FamilyContent />
            </div>
            <div>
              <PublicContent />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_family_recipes: (data) => dispatch(family_recipes(data)),
    write_query: (data) => dispatch(search_query(data)),
    write_public_recipes: (data) => dispatch(public_recipes(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    family_recipes: state.family_recipes,
    search_query: state.search_query,
    public_recipes: state.public_recipes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
