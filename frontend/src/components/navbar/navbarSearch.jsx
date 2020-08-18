import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

class NavbarSearch extends Component {
  state = {
    search: "",
    redirect: undefined,
    updated: false,
  };

  handleChange = (type) => (event) => {
    this.setState({ [type]: event.target.value });
  };

  handleSubmit = () => {
    const searchValue = this.state.search.split(" ").join("+");
    this.setState({ redirect: `s=${searchValue}` });
  };

  handleCheck = () => {
    if (this.state.redirect !== undefined) {
      if (this.state.search === "") {
        return <Redirect to={"/search"} />;
      }

      return <Redirect push to={`/search?${this.state.redirect}`} />;
    }
  };

  render() {
    return (
      <div className="navitem" id="navsearchwrapper">
        {this.handleCheck()}
        <input
          type="text"
          placeholder="Search"
          id="navSearchInput"
          onChange={this.handleChange("search")}
          defaultValue={this.props.searchDefault}
        />
        <button id="navSearchButton" onClick={this.handleSubmit}>
          <FaSearch id="navSearchButtonIcon " />
        </button>
      </div>
    );
  }
}

export default NavbarSearch;
