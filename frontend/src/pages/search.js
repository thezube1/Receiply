import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import LoadingPage from "../Loading";
import "../components/search/search.css";
import { Link } from "react-router-dom";
import { isEqual } from "lodash";

import SearchItem from "../components/search/SearchItem";
import SearchBar from "../components/search/SearchBar";
import NavbarSwitch from "../components/navbar/navbarswitch";
import SearchFilters from "../components/search/searchFilters";

class SearchPage extends Component {
  state = {
    query: "",
    recipes: undefined,
    check: false,
  };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    if (this.state.check === false) {
      this.setState({ query: parsed, check: true });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const parsed = queryString.parse(this.props.location.search);
    if (isEqual(parsed, previousState.query) === false) {
      axios
        .post("/api/search", parsed)
        .then((result) =>
          this.setState({ query: parsed, recipes: result.data })
        )
        .catch((err) => console.log(err));
    }
  }

  renderResult = () => {
    if (this.props.location.search === "") {
      return (
        <div>No search parameters provided. Showing most popular recipes.</div>
      );
    } else if (this.state.recipes === false) {
      return <div>Your search yielded no results</div>;
    } else {
      if (this.state.recipes === undefined) {
        return <LoadingPage />;
      } else {
        return this.state.recipes.map((item) => {
          return (
            <Link
              key={item.RECIPE_ID}
              to={`/recipe/${item.RECIPE_IDENTIFIER}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <SearchItem
                title={item.RECIPE_NAME}
                image={item.PHOTO_NAME}
                description={item.DESCRIPTION}
              />
            </Link>
          );
        });
      }
    }
  };

  render() {
    return (
      <div>
        <NavbarSwitch searchDefault={this.state.query.s} />
        <div id="searchContent">
          <SearchBar value={this.state.query.s} />
          <SearchFilters query={this.state.query} />
          <div id="searchContentWrapper">{this.renderResult()}</div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
