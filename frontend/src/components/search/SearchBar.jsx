import React, { Component } from "react";
import "./searchbar.css";
import { IoIosSearch } from "react-icons/io";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import { search } from "../../actions/actions";
import { connect } from "react-redux";

class SearchBar extends Component {
  state = {
    searchValue: "",
    redirect: undefined,
    default: undefined,
  };

  handleSubmit = () => {
    const params = this.props.search.split(" ").join("+");
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
      if (this.props.search === "") {
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
              onChange={(event) => this.props.write_search(event.target.value)}
              defaultValue={this.props.search}
            />
            <div id="searchBarBottom"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_search: (event) => dispatch(search(event)),
  };
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
