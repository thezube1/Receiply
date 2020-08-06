import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";

class NavbarSearch extends Component {
  state = {};
  render() {
    return (
      <div className="navitem" id="navsearchwrapper">
        <input type="text" placeholder="Search" id="navSearchInput" />
        <button id="navSearchButton">
          <FaSearch id="navSearchButtonIcon " />
        </button>
      </div>
    );
  }
}

export default NavbarSearch;
