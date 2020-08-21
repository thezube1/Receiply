import React, { Component } from "react";
import "./searchbar.css";
import { IoIosSearch } from "react-icons/io";
import { Redirect } from "react-router-dom";
class SearchBar extends Component {
  state = {
    searchValue: "",
    redirect: undefined,
    refresh: false,
  };

  handleChange = (type) => (event) => {
    this.setState({ [type]: event.target.value });
  };

  handleSubmit = () => {
    const params = this.state.searchValue.split(" ").join("+");
    this.setState({ redirect: `s=${params}` });
  };

  render() {
    if (this.state.redirect !== undefined) {
      if (this.state.searchValue === "") {
        window.location.reload(false);
        return <Redirect to={"/search"} />;
      } else {
        window.location.reload(false);
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
              defaultValue={this.props.value}
            />
            <div id="searchBarBottom"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
