import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

class NavbarSearch extends Component {
  state = {
    search: "",
    redirect: undefined,
  };

  handleChange = (type) => (event) => {
    this.setState({ [type]: event.target.value });
  };

  handleSubmit = () => {
    const searchValue = this.state.search.split(" ").join("&foo=");
    this.setState({ redirect: `foo=${searchValue}` });
  };

  render() {
    if (this.state.redirect !== undefined) {
      return <Redirect to={`/search?${this.state.redirect}`} />;
    }
    return (
      <div className="navitem" id="navsearchwrapper">
        <input
          type="text"
          placeholder="Search"
          id="navSearchInput"
          onChange={this.handleChange("search")}
        />
        <button id="navSearchButton" onClick={this.handleSubmit}>
          <FaSearch id="navSearchButtonIcon " />
        </button>
      </div>
    );
  }
}

export default NavbarSearch;
