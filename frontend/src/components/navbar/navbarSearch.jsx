import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { connect } from "react-redux";
import { search } from "../../actions/actions";
import { motion } from "framer-motion";
class NavbarSearch extends Component {
  state = {
    redirect: undefined,
    updated: false,
    active: false,
  };

  handleSubmit = () => {
    const searchValue = this.props.search.split(" ").join("+");
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

  handleOpacity = () => {
    return this.state.active === true ? "visible" : "hidden";
  };

  render() {
    return (
      <div id="navsearchwrapper">
        {this.handleCheck()}
        <input
          style={{
            visibility: this.handleOpacity(),
            transition: "visiblity 1s",
          }}
          type="text"
          placeholder="Search"
          id="navSearchInput"
          onChange={(event) => this.props.write_search(event.target.value)}
          defaultValue={this.props.search}
        />
        <button
          id="navSearchButton"
          onClick={this.handleSubmit}
          onMouseEnter={() => this.setState({ active: true })}
        >
          <FaSearch id="navSearchButtonIcon " />
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSearch);
