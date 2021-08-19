import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../../actions/actions";
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

  render() {
    return (
      <div id="navsearchwrapper">
        {this.handleCheck()}
        <form onSubmit={this.handleSubmit}>
          <input
            tabIndex="if (event.keyCode == 13) { this.handleSubmit; return false; }"
            type="text"
            placeholder="Search"
            id="navSearchInput"
            onChange={(event) => this.props.write_search(event.target.value)}
            defaultValue={this.props.search}
          />
        </form>
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
