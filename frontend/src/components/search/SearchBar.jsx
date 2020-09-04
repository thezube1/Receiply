import React, { Component } from "react";
import "./searchbar.css";
import { IoIosSearch } from "react-icons/io";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
class SearchBar extends Component {
  state = {
    searchValue: "",
    redirect: undefined,
    default: undefined,
  };

  handleChange = (type) => (event) => {
    this.setState({ [type]: event.target.value });
  };

  handleSubmit = () => {
    const params = this.state.searchValue.split(" ").join("+");
    this.setState({ redirect: `s=${params}` });
  };

  componentDidUpdate() {
    if (this.state.redirect !== undefined) {
      this.setState({ redirect: undefined });
    }
    const query = queryString.parse(window.location.search, {
      arrayFormat: "comma",
    });
    if (this.state.default !== query.s) {
      this.setState({ default: query.s });
    }
  }

  render() {
    if (this.state.redirect !== undefined) {
      if (this.state.searchValue === "") {
        return <Redirect to={"/search"} />;
      } else {
        return <Redirect to={`/search?${this.state.redirect}`} />;
      }
    }
    return (
      <div id="searchBarWrapper">
        <div id="searchBarHeaderWrapper">
          <button id="searchBarSubmit" onClick={() => this.handleSubmit()}>
            <div id="searchBarHeader">Search</div>
            <IoIosSearch id="searchBarIcon" />
          </button>
          <div id="searchBarInputWrapper">
            <input
              type="text"
              id="searchBarInput"
              onChange={this.handleChange("searchValue")}
              defaultValue={this.state.default}
            />
            <div id="searchBarBottom"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
