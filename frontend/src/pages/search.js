import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import LoadingPage from "../Loading";
import "../components/search/search.css";
import { Link } from "react-router-dom";

import SearchItem from "../components/search/SearchItem";
import SearchBar from "../components/search/SearchBar";
import NavbarSwitch from "../components/navbar/navbarswitch";

class SearchPage extends Component {
  state = {
    query: "",
    recipes: undefined,
  };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    axios
      .post("/api/search", parsed)
      .then((result) => this.setState({ recipes: result.data, query: parsed }));
  }

  render() {
    if (this.state.recipes === undefined) {
      return <LoadingPage />;
    } else if (this.props.location.search === "") {
      return (
        <React.Fragment>
          <NavbarSwitch searchDefault={this.state.query.s} />
          <SearchBar value={this.state.query.s} />
          <div id="searchWrapper">
            No search parameters provided. Showing most popular recipes.
          </div>
        </React.Fragment>
      );
    } else if (this.state.recipes === false) {
      return (
        <React.Fragment>
          <NavbarSwitch searchDefault={this.state.query.s} />
          <SearchBar value={this.state.query.s} />
          <div id="searchWrapper">Your search yielded no results.</div>
        </React.Fragment>
      );
    }

    return (
      <div id="searchWrapper">
        <NavbarSwitch searchDefault={this.state.query.s} />
        <SearchBar value={this.state.query.s} />
        <div id="searchContentWrapper">
          {this.state.recipes.map((item) => {
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
          })}
        </div>
      </div>
    );
  }
}

export default SearchPage;
