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
    const searchValue = this.state.search.split(" ").join("+");
    this.setState({ redirect: `s=${searchValue}` });
  };

  render() {
    if (this.state.redirect !== undefined) {
      if (this.state.search === "") {
        window.location.reload(false);
        return <Redirect to={"/search"} />;
      }
      window.location.reload(false);
      return <Redirect to={`/search?${this.state.redirect}`} />;
    }
    return (
      <div className="navitem" id="navsearchwrapper">
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
